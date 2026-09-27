"""Recompute model-validation summaries from locally held, restricted inputs.

Input records and individual predictions are not distributed with the code.
The cohort is defined by its 800 sample IDs. This script emits aggregates only.
Run ``python 01_validation_metrics.py --help`` for the required input paths.
"""

from __future__ import annotations

import argparse
import csv
from pathlib import Path

from sklearn.metrics import accuracy_score, cohen_kappa_score, f1_score


MODEL_VARIANTS = {
    "GPT-5-mini": ("emo_v2", "att_v2"),
    "GPT-4o": ("emo_v0", "att_v2"),
    "Claude": ("emo_v0", "att_v2"),
    "Gemini": ("emo_v2", "att_v2"),
    "DeepSeek-V3": ("emo_v2", "att_v2"),
}
TRUTH_COLUMNS = {
    "emotion": "emotion_reclassified_updated",
    "attention": "attention_reclassified_by_me",
}
INVALID_PREDICTIONS = {"", "ERROR", "FORMAT_FAILURE"}


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8-sig") as stream:
        return list(csv.DictReader(stream))


def load_cohort(path: Path) -> set[str]:
    rows = read_csv(path)
    ids = [row["sample_id"] for row in rows]
    if len(ids) != 800 or len(set(ids)) != 800:
        raise ValueError("Final validation cohort must have 800 unique sample IDs")
    return set(ids)


def load_truth(path: Path, cohort: set[str]) -> dict[str, dict[str, str]]:
    result = {}
    for row in read_csv(path):
        sample_id = row["sample_id"]
        if sample_id in cohort:
            if sample_id in result:
                raise ValueError(f"Duplicate reference ID {sample_id}")
            result[sample_id] = {task: row[column].strip() for task, column in TRUTH_COLUMNS.items()}
    if set(result) != cohort:
        raise ValueError(f"Reference labels missing for {len(cohort - set(result))} cohort IDs")
    if any(not label for values in result.values() for label in values.values()):
        raise ValueError("Empty reference label in final cohort")
    return result


def load_predictions(path: Path, variant: str, task: str) -> dict[str, str]:
    result = {}
    for row in read_csv(path):
        if row["variant"] == variant and row["task"] == task:
            sample_id = row["sample_id"]
            if sample_id in result:
                raise ValueError(f"Duplicate prediction for {sample_id}, {variant}, {task}")
            result[sample_id] = row["predicted"].strip()
    return result


def calculate(cohort: set[str], truth: dict[str, dict[str, str]],
              checkpoint_paths: dict[str, Path]) -> list[dict[str, str | int | float]]:
    results = []
    for model, (emotion_variant, attention_variant) in MODEL_VARIANTS.items():
        path = checkpoint_paths[model]
        for task, variant in (("emotion", emotion_variant),
                              ("attention", attention_variant)):
            predictions = load_predictions(path, variant, task)
            usable_ids = sorted(sample_id for sample_id in cohort
                                if predictions.get(sample_id, "") not in INVALID_PREDICTIONS)
            if not usable_ids:
                raise ValueError(f"No usable predictions for {model} {task}")
            y_true = [truth[sample_id][task] for sample_id in usable_ids]
            y_pred = [predictions[sample_id] for sample_id in usable_ids]
            results.append({
                "model": model, "task": task, "variant": variant,
                "n": len(usable_ids),
                "accuracy_percent": 100 * accuracy_score(y_true, y_pred),
                "cohen_kappa": cohen_kappa_score(y_true, y_pred),
                "macro_f1": f1_score(y_true, y_pred, average="macro", zero_division=0),
            })
    return results


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cohort", required=True, type=Path)
    parser.add_argument("--truth", required=True, type=Path)
    parser.add_argument("--gpt5-mini", required=True, type=Path)
    parser.add_argument("--gpt4o", required=True, type=Path)
    parser.add_argument("--claude", required=True, type=Path)
    parser.add_argument("--gemini", required=True, type=Path)
    parser.add_argument("--deepseek", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()
    paths = {
        "GPT-5-mini": args.gpt5_mini, "GPT-4o": args.gpt4o,
        "Claude": args.claude, "Gemini": args.gemini,
        "DeepSeek-V3": args.deepseek,
    }
    cohort = load_cohort(args.cohort)
    truth = load_truth(args.truth, cohort)
    rows = calculate(cohort, truth, paths)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", newline="", encoding="utf-8") as stream:
        writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)
    print(f"Wrote {len(rows)} aggregate model/task summaries to {args.output}")


if __name__ == "__main__":
    main()
 # Numbered public analysis script.
