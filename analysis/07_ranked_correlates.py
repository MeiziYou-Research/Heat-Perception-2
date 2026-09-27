"""Rank candidates under the baseline specification and retain model overlays.

Ranks are fixed using baseline partial R-squared (continuous)
or incremental McFadden pseudo-R-squared (binary); the reduced and corrected
Koppen-subtype extended models are overlaid at those same candidate positions.
"""

from __future__ import annotations

import argparse
from importlib import import_module
from pathlib import Path

import pandas as pd

_city_module = import_module("04_city_level_analysis")
BINARY_OUTCOMES = _city_module.BINARY_OUTCOMES
CONTINUOUS_OUTCOMES = _city_module.CONTINUOUS_OUTCOMES


def rank_results(results: pd.DataFrame, binary: bool = False) -> pd.DataFrame:
    required = {"outcome", "control_spec", "candidate_correlate", "partial_r2",
                "incremental_fit"}
    if missing := required - set(results):
        raise ValueError(f"Missing model-result columns: {sorted(missing)}")
    outcomes = BINARY_OUTCOMES if binary else CONTINUOUS_OUTCOMES
    effect = "incremental_fit" if binary else "partial_r2"
    eligible = results.loc[results["outcome"].isin(outcomes)].copy()
    baseline = eligible.loc[eligible["control_spec"].eq("country")].copy()
    baseline = baseline.sort_values(["outcome", effect, "candidate_correlate"],
                                    ascending=[True, False, True])
    count = 5 if binary else 10
    selected = baseline.groupby("outcome", sort=False).head(count).copy()
    selected["rank"] = selected.groupby("outcome").cumcount() + 1
    if selected.groupby("outcome").size().ne(count).any():
        raise ValueError("Not enough eligible candidates for every outcome")
    output = selected[["outcome", "candidate_correlate", "rank", effect]].rename(
        columns={effect: f"{effect}_baseline"})
    for spec, suffix in (("logn", "reduced"), ("both_subtype", "extended")):
        overlay = eligible.loc[eligible["control_spec"].eq(spec),
                               ["outcome", "candidate_correlate", effect]].rename(
            columns={effect: f"{effect}_{suffix}"})
        output = output.merge(overlay, on=["outcome", "candidate_correlate"],
                              validate="one_to_one")
    return output


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--binary", action="store_true")
    args = parser.parse_args()
    result = rank_results(pd.read_csv(args.input), binary=args.binary)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    result.to_csv(args.output, index=False)
    print(f"Wrote {len(result)} ranked candidate rows")


if __name__ == "__main__":
    main()
 # Numbered public analysis script.
