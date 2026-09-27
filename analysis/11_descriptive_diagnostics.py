"""Source-data summaries for Extended Data Fig. 3 panels a–c.

Panel a describes city-level ASR signs. Panel b reports observed country shares
with +/-1 Wald standard error truncated to [0, 1]. Panel c first selects each
city's top-ranked emotion by maximum ASR; if that maximum is not positive the
state is None. It then shows the most frequent top-ranked state per country.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
import pandas as pd


PANEL_A = (
    "E11_Fear", "E11_Sadness", "E21_Joy", "E21_Neutral",
    "E23_Joy", "E23_Neutral", "E22_Joy", "E25_Joy",
    "H21_Fear", "H31_Fear", "H41_Fear", "V41_Neutral", "V41_Fear",
    "V43_Fear",
)
PANEL_C = {"E31": "E31", "V11": "S11", "V21": "S21", "V42": "S42", "V44": "S44"}
COUNTRY_N = {"Australia": 4, "Canada": 7, "United Kingdom": 7, "United States": 32}


def prepare_asr(raw: pd.DataFrame) -> pd.DataFrame:
    data = raw.copy()
    data.columns = data.columns.astype(str).str.strip().str.lower()
    required = {"country", "city", "row_var", "row_level", "emotion", "asr"}
    if missing := required - set(data):
        raise ValueError(f"Missing ASR columns: {sorted(missing)}")
    data = data.loc[data["row_var"].eq("attention_sub")].copy()
    data["asr"] = pd.to_numeric(data["asr"], errors="raise")
    data["cell"] = data["row_level"].astype(str) + "_" + data["emotion"].astype(str)
    if data.duplicated(["country", "city", "cell"]).any():
        raise ValueError("Duplicate city ASR cell")
    return data


def panel_a(data: pd.DataFrame) -> pd.DataFrame:
    wide = data.pivot(index=["country", "city"], columns="cell", values="asr")
    if len(wide) != 50:
        raise ValueError("Expected 50 cities")
    rows = []
    for name in PANEL_A:
        if name not in wide:
            raise ValueError(f"Missing panel-a ASR cell: {name}")
        values = wide[name]
        n = int(values.notna().sum())
        positive, zero, negative = (int(values.gt(0).sum()), int(values.eq(0).sum()),
                                    int(values.lt(0).sum()))
        rows.append({"variable": name, "n_city": n, "n_pos": positive,
                     "n_zero": zero, "n_neg": negative,
                     "share_pos": positive / n, "share_zero": zero / n,
                     "share_neg": negative / n})
    return pd.DataFrame(rows)


def panel_b(data: pd.DataFrame) -> pd.DataFrame:
    wide = data.pivot(index=["country", "city"], columns="cell", values="asr")
    fear = wide[["V41_Fear", "V43_Fear", "V44_Fear"]].mean(axis=1)
    states = pd.DataFrame({"SysFear_binary": (fear > 0).astype(int),
                           "V42_Anger_bin": (wide["V42_Anger"] > 0).astype(int)},
                          index=wide.index).reset_index()
    rows = []
    for country in COUNTRY_N:
        subset = states.loc[states["country"].eq(country)]
        n = len(subset)
        if n != COUNTRY_N[country]:
            raise ValueError(f"Incorrect city count for {country}: {n}")
        for mechanism in ("SysFear_binary", "V42_Anger_bin"):
            share = float(subset[mechanism].mean())
            se = float(np.sqrt(share * (1 - share) / n))
            rows.append({"country": country, "mechanism": mechanism,
                         "n_city": n, "share_one": share, "se": se,
                         "lower": max(0.0, share - se), "upper": min(1.0, share + se),
                         "mech_label": ("Systems/climate\u2013\nFear > 0" if mechanism == "SysFear_binary"
                                        else "S42\u2013Anger > 0")})
    return pd.DataFrame(rows)


def panel_c(data: pd.DataFrame) -> pd.DataFrame:
    selected = data.loc[data["row_level"].isin(PANEL_C)].copy()
    selected["row_level"] = selected["row_level"].map(PANEL_C)
    if selected[["country", "city", "row_level"]].drop_duplicates().shape[0] != 250:
        raise ValueError("Expected five subcategories in each of 50 cities")
    selected = selected.sort_values(["country", "city", "row_level"], kind="stable")
    winner_index = selected.groupby(["country", "city", "row_level"], sort=True)["asr"].idxmax()
    city_top = selected.loc[winner_index, ["country", "city", "row_level", "emotion", "asr"]].copy()
    city_top["top_emotion"] = np.where(city_top["asr"] > 0, city_top["emotion"], "None")
    counts = (city_top.groupby(["country", "row_level", "top_emotion"], sort=True)
              .size().rename("n_city").reset_index())
    counts["share"] = counts["n_city"] / counts.groupby(["country", "row_level"])["n_city"].transform("sum")
    mode_index = counts.groupby(["country", "row_level"], sort=True)["share"].idxmax()
    result = counts.loc[mode_index].copy()
    result["mech_label"] = result["row_level"]
    result["share_pct"] = 100 * result["share"]
    return result.reset_index(drop=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--sheet", default="ASR_City_long_withDrivers")
    parser.add_argument("--output-prefix", required=True, type=Path)
    args = parser.parse_args()
    raw = (pd.read_excel(args.input, sheet_name=args.sheet) if args.input.suffix.lower() == ".xlsx"
           else pd.read_csv(args.input))
    data = prepare_asr(raw)
    args.output_prefix.parent.mkdir(parents=True, exist_ok=True)
    for letter, summary in (("a", panel_a(data)), ("b", panel_b(data)),
                            ("c", panel_c(data))):
        output = args.output_prefix.with_name(args.output_prefix.name + f"_3{letter}.csv")
        summary.to_csv(output, index=False)
        print(f"Panel {letter}: {len(summary)} rows")


if __name__ == "__main__":
    main()
 # Numbered public analysis script.
