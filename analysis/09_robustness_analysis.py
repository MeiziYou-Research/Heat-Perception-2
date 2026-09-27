"""Threshold sensitivity and two-sided geographic Fisher-test calculations.

The threshold calculation uses restricted city-level outcomes. Geographic
group membership must be supplied separately; the Fisher function itself
accepts the four observed counts and makes no geography assumptions.
"""

from __future__ import annotations

import argparse
from pathlib import Path

import pandas as pd
from scipy.stats import fisher_exact


SELECTED_NINE = (
    "E11_Surprise", "E11_Neutral", "E21_Sad", "E23_Sad", "E24_Joy",
    "E33_Joy", "HealthFear", "ClimateNeutral", "SysFear",
)
THRESHOLDS = (0.5, 1.0, 1.5)


def threshold_sensitivity(city: pd.DataFrame) -> pd.DataFrame:
    if len(city) != 50:
        raise ValueError("Threshold sensitivity requires the final 50-city sample")
    if missing := set(SELECTED_NINE) - set(city):
        raise ValueError(f"Missing outcomes: {sorted(missing)}")
    rows = []
    for outcome in SELECTED_NINE:
        if city[outcome].isna().any():
            raise ValueError(f"Missing city ASR for {outcome}")
        for threshold in THRESHOLDS:
            share = float((city[outcome] > threshold).mean())
            rows.append({"variable": outcome, "threshold": threshold,
                         "share_meeting": share, "share_percent": 100 * share})
    return pd.DataFrame(rows)


def geographic_fisher(a_yes: int, a_n: int, b_yes: int, b_n: int) -> tuple[float, float]:
    if not (0 <= a_yes <= a_n and 0 <= b_yes <= b_n and a_n > 0 and b_n > 0):
        raise ValueError("Invalid binary group counts")
    return fisher_exact([[a_yes, a_n - a_yes], [b_yes, b_n - b_yes]],
                        alternative="two-sided")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--city-outcomes", type=Path)
    parser.add_argument("--output", type=Path,
                        help="Aggregate threshold results; required with --city-outcomes")
    args = parser.parse_args()
    if args.city_outcomes:
        if not args.output:
            parser.error("--output is required with --city-outcomes")
        result = threshold_sensitivity(pd.read_csv(args.city_outcomes))
        args.output.parent.mkdir(parents=True, exist_ok=True)
        result.to_csv(args.output, index=False)
        print(f"Wrote {len(result)} threshold results")
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
 # Numbered public analysis script.
