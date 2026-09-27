"""Construct the final city-level ASR outcomes from a restricted ASR table.

Input: one row per city x attention subcategory x emotion, with columns
country, city, row_var, row_level, emotion and asr. The public repository does
not include the restricted city-level input or the resulting city-level table.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
import pandas as pd


CONTINUOUS_OUTCOMES = (
    "E11_Surprise", "E11_Neutral", "E21_Sad", "E23_Sad", "E24_Joy",
    "E33_Joy", "H21_Fear", "H41_Fear", "HealthFear", "V41_Neutral",
    "ClimateNeutral", "SysFear",
)
BINARY_OUTCOMES = (
    "E11_Abnormality", "E31_JoyDominant", "E32_Surprise_bin",
    "V11_Anger_bin", "V21_Fear_bin",
)
EMOTIONS = ("Joy", "Surprise", "Neutral", "Sadness", "Fear", "Disgust", "Anger")


def mean_existing(frame: pd.DataFrame, names: tuple[str, ...]) -> pd.Series:
    if any(name not in frame for name in names):
        raise ValueError(f"Missing composite ASR cells: {set(names) - set(frame)}")
    return frame.loc[:, names].mean(axis=1, skipna=True)


def construct_outcomes(long_data: pd.DataFrame) -> pd.DataFrame:
    required = {"country", "city", "row_var", "row_level", "emotion", "asr"}
    if missing := required - set(long_data):
        raise ValueError(f"Missing input columns: {sorted(missing)}")
    sub = long_data.loc[long_data["row_var"].eq("attention_sub")].copy()
    sub["cell"] = sub["row_level"].astype(str) + "_" + sub["emotion"].astype(str)
    sub["asr"] = pd.to_numeric(sub["asr"], errors="raise")
    if sub.duplicated(["country", "city", "cell"]).any():
        raise ValueError("Duplicate city/attention/emotion ASR cells")
    city = sub.pivot(index=["country", "city"], columns="cell", values="asr")
    if len(city) != 50:
        raise ValueError(f"Final sample requires 50 cities; found {len(city)}")

    direct = {
        "E11_Surprise": "E11_Surprise", "E11_Neutral": "E11_Neutral",
        "E21_Sad": "E21_Sadness", "E23_Sad": "E23_Sadness",
        "E24_Joy": "E24_Joy", "E33_Joy": "E33_Joy",
        "H21_Fear": "H21_Fear", "H41_Fear": "H41_Fear",
        "V41_Neutral": "V41_Neutral",
    }
    output = pd.DataFrame(index=city.index)
    for name, cell in direct.items():
        if cell not in city:
            raise ValueError(f"Missing ASR cell: {cell}")
        output[name] = city[cell]
    output["HealthFear"] = mean_existing(city, ("H21_Fear", "H31_Fear", "H41_Fear"))
    output["ClimateNeutral"] = mean_existing(city, ("V41_Neutral", "V43_Neutral", "V44_Neutral"))
    output["SysFear"] = mean_existing(city, ("V41_Fear", "V43_Fear", "V44_Fear"))

    surprise, neutral = city["E11_Surprise"], city["E11_Neutral"]
    output["E11_Abnormality"] = np.where(surprise.notna() & neutral.notna(),
                                           (surprise > neutral).astype(int), np.nan)
    e31_others = [f"E31_{emotion}" for emotion in EMOTIONS if emotion != "Joy"]
    if any(name not in city for name in ("E31_Joy", *e31_others)):
        raise ValueError("E31 requires Joy and all six other emotion ASRs")
    other_max = city[e31_others].max(axis=1, skipna=True)
    joy = city["E31_Joy"]
    output["E31_JoyDominant"] = np.where(other_max.notna(),
        ((joy > 0) & (joy > other_max)).astype(int), np.nan)
    for outcome, cell in (("E32_Surprise_bin", "E32_Surprise"),
                          ("V11_Anger_bin", "V11_Anger"),
                          ("V21_Fear_bin", "V21_Fear")):
        if cell not in city:
            raise ValueError(f"Missing ASR cell: {cell}")
        output[outcome] = np.where(city[cell].notna(), (city[cell] > 0).astype(int), np.nan)

    if int(output["E31_JoyDominant"].sum()) != 14:
        raise ValueError("Corrected E31 rule must yield 14 indicator-positive cities")
    return output.reset_index()


def sign_counts(city: pd.DataFrame) -> pd.DataFrame:
    rows = []
    for outcome in CONTINUOUS_OUTCOMES:
        values = city[outcome]
        rows.append({"variable": outcome, "n_city": int(values.notna().sum()),
                     "n_neg": int(values.lt(0).sum()),
                     "n_zero": int(values.eq(0).sum()),
                     "n_pos": int(values.gt(0).sum())})
    return pd.DataFrame(rows)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--sheet", default="ASR_City_long_withDrivers")
    parser.add_argument("--output", required=True, type=Path,
                        help="Restricted city-level output; never commit it")
    args = parser.parse_args()
    if args.input.suffix.lower() in {".xlsx", ".xls"}:
        source = pd.read_excel(args.input, sheet_name=args.sheet)
    else:
        source = pd.read_csv(args.input)
    source.columns = source.columns.astype(str).str.strip().str.lower()
    city = construct_outcomes(source)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    city.to_csv(args.output, index=False)
    print(f"Computed {len(city)} cities, {len(CONTINUOUS_OUTCOMES)} continuous and "
          f"{len(BINARY_OUTCOMES)} binary outcomes")


if __name__ == "__main__":
    main()
 # Numbered public analysis script.
