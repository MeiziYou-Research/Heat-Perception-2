"""Attention–emotion contingency statistics used for the pooled ASR figures.

The adjusted standardised residual is (O-E)/sqrt(E(1-row share)(1-column
share)); cell P values are two-sided normal-tail probabilities. The restricted
post-level classification table is supplied by the researcher at run time.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
import pandas as pd
from scipy.stats import norm


EMOTIONS = ("Joy", "Surprise", "Neutral", "Sadness", "Fear", "Disgust", "Anger")
SUBCATEGORIES = (
    "E11", "E12", "E21", "E22", "E23", "E24", "E25", "E31", "E32", "E33",
    "H11", "H12", "H21", "H22", "H31", "H41",
    "V11", "V21", "V22", "V31", "V41", "V42", "V43", "V44",
)
CHANNELS = (
    "Exposure & lived experience",
    "Health impacts & burden",
    "Vulnerability, systems & governance",
)


def contingency(data: pd.DataFrame, attention: str, emotion: str,
                levels: tuple[str, ...]) -> pd.DataFrame:
    rows = data[attention].astype("string").str.strip()
    columns = data[emotion].astype("string").str.strip()
    table = pd.crosstab(rows, columns)
    return table.reindex(index=levels, columns=EMOTIONS, fill_value=0)


def adjusted_standardised_residuals(table: pd.DataFrame) -> pd.DataFrame:
    observed = table.to_numpy(dtype=float)
    n = observed.sum()
    if n <= 0:
        raise ValueError("Empty contingency table")
    row_total = observed.sum(axis=1)
    col_total = observed.sum(axis=0)
    expected = np.outer(row_total, col_total) / n
    denominator = np.sqrt(expected * np.outer(1 - row_total / n, 1 - col_total / n))
    with np.errstate(divide="ignore", invalid="ignore"):
        values = (observed - expected) / denominator
    values[~np.isfinite(values)] = 0.0  # matches the manuscript plotting code
    return pd.DataFrame(values, index=table.index, columns=table.columns)


def two_sided_cell_p(asr: pd.DataFrame) -> pd.DataFrame:
    return pd.DataFrame(2 * norm.sf(np.abs(asr.to_numpy())),
                        index=asr.index, columns=asr.columns)


def cramers_v(table: pd.DataFrame) -> float:
    observed = table.to_numpy(dtype=float)
    nonempty_rows = observed.sum(axis=1) > 0
    nonempty_cols = observed.sum(axis=0) > 0
    observed = observed[np.ix_(nonempty_rows, nonempty_cols)]
    n = observed.sum()
    if n <= 0 or min(observed.shape) < 2:
        return float("nan")
    expected = np.outer(observed.sum(axis=1), observed.sum(axis=0)) / n
    statistic = np.sum((observed - expected) ** 2 / expected)
    return float(np.sqrt(statistic / (n * min(observed.shape[0] - 1, observed.shape[1] - 1))))


def pooled_subcategory_asr(data: pd.DataFrame) -> pd.DataFrame:
    table = contingency(data, "attention_sub", "emotion_gpt", SUBCATEGORIES)
    asr = adjusted_standardised_residuals(table)
    p_values = two_sided_cell_p(asr)
    rows = []
    for code in SUBCATEGORIES:
        for emotion in EMOTIONS:
            rows.append({"attention_code_or_channel": code.replace("V", "S", 1),
                         "emotion": emotion,
                         "adjusted_standardised_residual": asr.loc[code, emotion],
                         "two_sided_p_value": p_values.loc[code, emotion]})
    return pd.DataFrame(rows)


def pooled_channel_asr(data: pd.DataFrame) -> pd.DataFrame:
    table = contingency(data, "attention", "emotion_gpt", CHANNELS)
    asr = adjusted_standardised_residuals(table)
    p_values = two_sided_cell_p(asr)
    rows = []
    for channel in CHANNELS:
        for emotion in EMOTIONS:
            display = ("Systems & governance" if channel.startswith("Vulnerability")
                       else channel)
            rows.append({"attention_code_or_channel": display,
                         "emotion": emotion,
                         "adjusted_standardised_residual": asr.loc[channel, emotion],
                         "two_sided_p_value": p_values.loc[channel, emotion]})
    return pd.DataFrame(rows)


def city_cramers_v(data: pd.DataFrame) -> pd.DataFrame:
    if missing := {"country", "city", "attention", "attention_sub", "emotion_gpt"} - set(data):
        raise ValueError(f"Missing city-level input columns: {sorted(missing)}")
    rows = []
    for (country, city), group in data.groupby(["country", "city"], sort=True):
        for resolution, attention, levels in (("Channel", "attention", CHANNELS),
                                              ("Subcategory", "attention_sub", SUBCATEGORIES)):
            rows.append({"country": country, "city": str(city).title(),
                         "resolution": resolution,
                         "cramers_v": cramers_v(contingency(group, attention, "emotion_gpt", levels))})
    if len(rows) != 100:
        raise ValueError(f"Expected 100 city-resolution results, found {len(rows)}")
    return pd.DataFrame(rows)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--sheet", default="data")
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--resolution", choices=("subcategory", "channel", "city"),
                        default="subcategory")
    args = parser.parse_args()
    data = (pd.read_excel(args.input, sheet_name=args.sheet) if args.input.suffix.lower() == ".xlsx"
            else pd.read_csv(args.input))
    data.columns = data.columns.astype(str).str.strip().str.lower().str.replace(r"\s+", "_", regex=True)
    required = ({"country", "city", "attention_sub", "attention", "emotion_gpt"}
                if args.resolution == "city" else
                {"attention_sub" if args.resolution == "subcategory" else "attention", "emotion_gpt"})
    if missing := required - set(data):
        raise ValueError(f"Missing input columns: {sorted(missing)}")
    result = (pooled_subcategory_asr(data) if args.resolution == "subcategory"
              else pooled_channel_asr(data) if args.resolution == "channel"
              else city_cramers_v(data))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    result.to_csv(args.output, index=False)
    print(f"Wrote {len(result)} {args.resolution} results")


if __name__ == "__main__":
    main()
 # Numbered public analysis script.
