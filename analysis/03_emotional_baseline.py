"""Recompute Fig. 2 post-weighted bars and across-city descriptive intervals.

Country post shares and city shares are displayed to one decimal place in the
established analysis; quantiles are calculated from those displayed city shares.
The pooled post share retains its unrounded value. No uncertainty interval is
interpreted as post-level sampling error.
"""

from __future__ import annotations

import argparse
from importlib import import_module
from pathlib import Path

import pandas as pd

EMOTIONS = import_module("02_attention_emotion_coupling").EMOTIONS


COUNTRIES = ("All", "Australia", "Canada", "United Kingdom", "United States")
COUNTRY_CITY_N = {"All": 50, "Australia": 4, "Canada": 7,
                  "United Kingdom": 7, "United States": 32}


def figure_2_data(posts: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame]:
    if missing := {"country", "city", "emotion_gpt"} - set(posts):
        raise ValueError(f"Missing classified-post columns: {sorted(missing)}")
    actual_cities = posts.groupby("country")["city"].nunique()
    for country in COUNTRIES[1:]:
        if actual_cities.get(country, 0) != COUNTRY_CITY_N[country]:
            raise ValueError(f"Unexpected city count for {country}")
    if posts.groupby(["country", "city"]).ngroups != 50:
        raise ValueError("Expected 50 country-city pairs")

    rows_a, rows_b = [], []
    for baseline in COUNTRIES:
        sample = posts if baseline == "All" else posts.loc[posts["country"].eq(baseline)]
        city_shares = (sample.groupby(["country", "city"])["emotion_gpt"]
                       .value_counts(normalize=True).unstack(fill_value=0) * 100).round(1)
        post_shares = sample["emotion_gpt"].value_counts(normalize=True) * 100
        n_cities = COUNTRY_CITY_N[baseline]
        for emotion in EMOTIONS:
            centre = float(post_shares.get(emotion, 0))
            if baseline != "All":
                centre = round(centre, 1)
            values = city_shares[emotion]
            q25, median, q75 = values.quantile([0.25, 0.5, 0.75])
            rows_a.append({"baseline": baseline, "emotion": emotion,
                           "post_share_percent": centre,
                           "city_q25_percent": float(q25),
                           "city_q75_percent": float(q75), "n_cities": n_cities})
            rows_b.append({"baseline": baseline, "emotion": emotion,
                           "median_city_deviation_pp": float(median - centre),
                           "q25_deviation_pp": float(q25 - centre),
                           "q75_deviation_pp": float(q75 - centre),
                           "n_cities": n_cities})
    return pd.DataFrame(rows_a), pd.DataFrame(rows_b)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path)
    parser.add_argument("--sheet", default="data")
    parser.add_argument("--output-prefix", required=True, type=Path)
    args = parser.parse_args()
    data = (pd.read_excel(args.input, sheet_name=args.sheet) if args.input.suffix.lower() == ".xlsx"
            else pd.read_csv(args.input))
    data.columns = data.columns.astype(str).str.strip().str.lower()
    a, b = figure_2_data(data)
    args.output_prefix.parent.mkdir(parents=True, exist_ok=True)
    a.to_csv(args.output_prefix.with_name(args.output_prefix.name + "_2a.csv"), index=False)
    b.to_csv(args.output_prefix.with_name(args.output_prefix.name + "_2b.csv"), index=False)
    print("Wrote Fig. 2a/b descriptive summaries")


if __name__ == "__main__":
    main()
 # Numbered public analysis script.
