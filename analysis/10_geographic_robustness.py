"""Final 17-outcome geographic comparisons across six predefined groupings.

Continuous outcomes are present when ASR > 1 in the expected positive direction;
the five formal indicators retain their original binary rules. Comparisons use
two-sided Fisher exact tests without multiplicity adjustment. Gulf/South and
Midwest US cities are excluded only from the US east–west comparison.
"""

from __future__ import annotations

import argparse
from importlib import import_module
from pathlib import Path

import pandas as pd

geographic_fisher = import_module("09_robustness_analysis").geographic_fisher


CONTINUOUS = (
    "ClimateNeutral", "E24_Joy", "H41_Fear", "E11_Neutral", "E11_Surprise",
    "SysFear", "E23_Sad", "HealthFear", "H21_Fear", "E33_Joy",
    "V41_Neutral", "E21_Sad",
)
BINARY = (
    "E11_Abnormality", "E31_JoyDominant", "E32_Surprise_bin",
    "V11_Anger_bin", "V21_Fear_bin",
)
DISPLAY = {
    "ClimateNeutral": "Systems/climate\u2013Neutral", "E24_Joy": "E24\u2013Joy",
    "H41_Fear": "H41\u2013Fear", "E11_Neutral": "E11\u2013Neutral",
    "E11_Surprise": "E11\u2013Surprise", "SysFear": "Systems/climate\u2013Fear",
    "E23_Sad": "E23\u2013Sadness", "HealthFear": "Health composite\u2013Fear",
    "H21_Fear": "H21\u2013Fear", "E33_Joy": "E33\u2013Joy",
    "V41_Neutral": "S41\u2013Neutral", "E21_Sad": "E21\u2013Sadness",
    "E11_Abnormality": "E11 Abnormality", "E31_JoyDominant": "E31 Joy-dominant",
    "E32_Surprise_bin": "E32 Surprise", "V11_Anger_bin": "S11 Anger",
    "V21_Fear_bin": "S21 Fear",
}

US_COASTAL = set("new york|boston|philadelphia|baltimore|miami|new orleans|houston|san diego|san francisco|seattle|portland|chicago".split("|"))
CANADA_COASTAL = {"vancouver", "toronto"}
UK_COASTAL = {"liverpool", "bristol", "london"}
US_EAST = set("new york|boston|philadelphia|baltimore|arlington|richmond|atlanta|charlotte|birmingham|nashville|louisville|miami".split("|"))
US_WEST = set("seattle|portland|san francisco|san diego|vancouver|denver|phoenix|las vegas|paradise|fresno".split("|"))
US_GULF_SOUTH = set("new orleans|houston|san antonio|austin|dallas|fort worth".split("|"))
US_MIDWEST = {"chicago", "columbus", "indianapolis", "madison"}
AU_EAST = {"brisbane", "sydney", "melbourne"}


def classify_geography(country: str, city: str) -> tuple[str, str | None, str | None]:
    name = city.strip().casefold()
    if country == "United States":
        known = US_EAST | US_WEST | US_GULF_SOUTH | US_MIDWEST
        if name not in known:
            raise ValueError(f"Unknown United States city: {city}")
        region = ("Eastern" if name in US_EAST else "Western" if name in US_WEST else
                  "Gulf/South" if name in US_GULF_SOUTH else "Midwest")
        return ("Coastal" if name in US_COASTAL else "Inland", region, None)
    if country == "Canada":
        known = CANADA_COASTAL | {"calgary", "edmonton", "london", "ottawa", "winnipeg"}
        if name not in known:
            raise ValueError(f"Unknown Canadian city: {city}")
        return ("Coastal" if name in CANADA_COASTAL else "Inland", None, None)
    if country == "United Kingdom":
        known = UK_COASTAL | {"birmingham", "leeds", "manchester", "sheffield"}
        if name not in known:
            raise ValueError(f"Unknown United Kingdom city: {city}")
        return ("Coastal" if name in UK_COASTAL else "Inland", None, None)
    if country == "Australia":
        if name not in AU_EAST | {"perth"}:
            raise ValueError(f"Unknown Australian city: {city}")
        return ("Coastal", None, "East Coast" if name in AU_EAST else "West Coast")
    raise ValueError(f"Unexpected country: {country}")


def city_geographic_states(outcomes: pd.DataFrame) -> pd.DataFrame:
    if len(outcomes) != 50 or outcomes.duplicated(["country", "city"]).any():
        raise ValueError("Expected 50 unique country-city outcome rows")
    if missing := set(CONTINUOUS + BINARY) - set(outcomes):
        raise ValueError(f"Missing final outcomes: {sorted(missing)}")
    city = outcomes[["country", "city"]].copy()
    groups = [classify_geography(country, name)
              for country, name in zip(city["country"], city["city"])]
    city[["coastal_inland", "us_region", "au_coast"]] = pd.DataFrame(groups, index=city.index)
    for outcome in CONTINUOUS:
        city[outcome] = (outcomes[outcome] > 1).astype(int)
    for outcome in BINARY:
        city[outcome] = outcomes[outcome].astype(int)
    return city


def comparisons(states: pd.DataFrame) -> pd.DataFrame:
    specifications = (
        ("United States\nEast vs west", "United States", "us_region", "Eastern", "Western"),
        ("United States\nCoastal vs inland", "United States", "coastal_inland", "Coastal", "Inland"),
        ("Canada\nCoastal vs inland", "Canada", "coastal_inland", "Coastal", "Inland"),
        ("United Kingdom\nCoastal vs inland", "United Kingdom", "coastal_inland", "Coastal", "Inland"),
        ("Australia\nEast vs west", "Australia", "au_coast", "East Coast", "West Coast"),
        ("Pooled\nCoastal vs inland", "Pooled", "coastal_inland", "Coastal", "Inland"),
    )
    rows = []
    for label, country, column, group_a, group_b in specifications:
        subset = (states.loc[states["country"].isin(("United States", "Canada", "United Kingdom"))]
                  if country == "Pooled" else states.loc[states["country"].eq(country)])
        a = subset.loc[subset[column].eq(group_a)]
        b = subset.loc[subset[column].eq(group_b)]
        if a.empty or b.empty:
            raise ValueError(f"Empty geographic group in {label}")
        for outcome in CONTINUOUS + BINARY:
            a_yes, b_yes = int(a[outcome].sum()), int(b[outcome].sum())
            odds_ratio, p_value = geographic_fisher(a_yes, len(a), b_yes, len(b))
            rows.append({"comparison": label, "outcome": DISPLAY[outcome],
                         "outcome_class": ("Direction-stable continuous" if outcome in CONTINUOUS
                                           else "Context-sensitive indicators"),
                         "group_a": group_a, "group_b": group_b,
                         "group_a_yes": a_yes, "group_a_n": len(a),
                         "group_b_yes": b_yes, "group_b_n": len(b),
                         "difference_pp": 100 * (a_yes / len(a) - b_yes / len(b)),
                         "odds_ratio": odds_ratio, "p_value": p_value,
                         "nominal_significant": p_value < 0.05})
    result = pd.DataFrame(rows)
    if len(result) != 102:
        raise AssertionError(f"Expected 102 tests, found {len(result)}")
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--city-outcomes", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()
    result = comparisons(city_geographic_states(pd.read_csv(args.city_outcomes)))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    result.to_csv(args.output, index=False)
    print(f"Wrote {len(result)} two-sided Fisher tests")


if __name__ == "__main__":
    main()
 # Numbered public analysis script.
