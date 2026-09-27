"""Prepare a restricted 50-city model table from the classified ASR workbook.

The output contains city identifiers and candidate correlates. It must remain
local and must not be committed to the public repository.
"""

from __future__ import annotations

import argparse
from importlib import import_module
import re
from pathlib import Path

import numpy as np
import pandas as pd

construct_outcomes = import_module("04_city_level_analysis").construct_outcomes


CANDIDATES = (
    "cgi", "hgi", "tgi", "temp", "dtr", "hot_night_days_m2",
    "hot_day_days_m2", "income_z", "ndvi",
    "nightlight", "gini_summe", "gexpo1km", "prop_over65",
    "w_health", "w_communit", "w_educatio", "w_food", "w_nightlif",
    "w_mobility", "w_active", "w_pois", "p_health", "p_communit",
    "p_educatio", "p_food", "p_nightlif", "p_mobility", "p_active",
    "p_pois", "c_health", "c_communit", "c_educatio", "c_food",
    "c_nightlif", "c_mobility", "c_active", "c_pois", "pop",
)

SOURCE_COLUMN_ALIASES = {
    "cg": "cgi", "hg": "hgi", "temp_2022": "temp",
    "dtr_2022": "dtr", "ndvi_2022": "ndvi",
    "nightlight_2020": "nightlight", "pop_2022": "pop",
}


def clean_name(name: str) -> str:
    return re.sub(r"_+", "_", re.sub(r"[^a-z0-9_]+", "_",
                  re.sub(r"\s+", "_", name.strip().lower()))).strip("_")


def prepare(raw: pd.DataFrame, koppen_mapping: pd.DataFrame | None = None) -> pd.DataFrame:
    raw = raw.copy()
    raw.columns = [clean_name(str(column)) for column in raw.columns]
    for old, new in SOURCE_COLUMN_ALIASES.items():
        if old in raw and new in raw:
            raise ValueError(f"Both legacy and final names found: {old}, {new}")
    raw = raw.rename(columns=SOURCE_COLUMN_ALIASES)
    outcomes = construct_outcomes(raw)
    if missing := {"country", "city", "n_group"} - set(raw):
        raise ValueError(f"Missing city or post-count columns: {sorted(missing)}")
    candidates = [name for name in CANDIDATES if name in raw]
    if not candidates:
        raise ValueError("No candidate correlate columns found")
    values = raw.groupby(["country", "city"], sort=False)[["n_group", *candidates]].first().reset_index()
    for name in ("n_group", *candidates):
        values[name] = pd.to_numeric(values[name].astype(str).str.replace(",", ""), errors="coerce")
    city = outcomes.merge(values, on=["country", "city"], validate="one_to_one")
    if koppen_mapping is not None:
        required = {"country", "city", "koppen_subtype_confirmed"}
        if missing := required - set(koppen_mapping):
            raise ValueError(f"Missing confirmed Köppen mapping columns: {sorted(missing)}")
        mapping = koppen_mapping[list(required)].copy()
        mapping["key"] = (mapping["country"].str.strip().str.casefold() + "||" +
                          mapping["city"].str.strip().str.casefold())
        if len(mapping) != 50 or mapping["key"].duplicated().any():
            raise ValueError("Confirmed Köppen mapping must have 50 unique city-country pairs")
        city["key"] = (city["country"].str.strip().str.casefold() + "||" +
                       city["city"].str.strip().str.casefold())
        city = city.merge(mapping[["key", "koppen_subtype_confirmed"]],
                          on="key", validate="one_to_one").drop(columns="key")
        if len(city) != 50 or city["koppen_subtype_confirmed"].isna().any():
            raise ValueError("Incomplete confirmed Köppen subtype mapping")
    city["log_n"] = np.log(city["n_group"])
    if len(city) != 50 or city["log_n"].isna().any():
        raise ValueError("Expected 50 cities with positive post counts")
    for name in candidates:
        values = city[name]
        sd = values.std(ddof=1)
        city[f"{name}_z"] = ((values - values.mean()) / sd
                             if np.isfinite(sd) and sd > 0 else 0.0)
    return city


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--sheet", default="ASR_City_long_withDrivers")
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--koppen-mapping", type=Path,
                        help="Confirmed 50-city mapping; subtype is used only in the extended model")
    args = parser.parse_args()
    raw = (pd.read_excel(args.input, sheet_name=args.sheet) if args.input.suffix.lower() == ".xlsx"
           else pd.read_csv(args.input))
    mapping = pd.read_csv(args.koppen_mapping) if args.koppen_mapping else None
    city = prepare(raw, mapping)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    city.to_csv(args.output, index=False)
    print(f"Prepared {len(city)} city rows and {len([name for name in CANDIDATES if name in city])} candidates")


if __name__ == "__main__":
    main()
 # Numbered public analysis script.
