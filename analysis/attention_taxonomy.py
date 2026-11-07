"""Canonical attention-subcategory identifiers used by the public analyses."""

from __future__ import annotations

import pandas as pd


SUBCATEGORIES = (
    "E11", "E12", "E21", "E22", "E23", "E24", "E25", "E31", "E32", "E33",
    "H11", "H12", "H21", "H22", "H31", "H41",
    "S11", "S21", "S22", "S31", "S41", "S42", "S43", "S44",
)
EMOTIONS = ("Joy", "Surprise", "Neutral", "Sadness", "Fear", "Disgust", "Anger")


def require_codes(values: pd.Series, allowed: tuple[str, ...], field: str) -> pd.Series:
    """Reject missing or unknown labels before a grouping operation can drop them."""
    clean = values.astype("string").str.strip()
    missing = clean.isna() | clean.eq("")
    if missing.any():
        raise ValueError(f"{field}: {int(missing.sum())} missing labels")
    unknown = sorted(set(clean.unique()) - set(allowed))
    if unknown:
        raise ValueError(f"{field}: unexpected labels {unknown}; expected {list(allowed)}")
    return clean


def require_complete_city_asr(data: pd.DataFrame) -> pd.DataFrame:
    """Require one ASR for every canonical subcategory–emotion cell per city."""
    required = {"country", "city", "row_level", "emotion", "asr"}
    if absent := required - set(data):
        raise ValueError(f"Missing city ASR columns: {sorted(absent)}")
    result = data.copy()
    for field in ("country", "city"):
        if result[field].isna().any() or result[field].astype("string").str.strip().eq("").any():
            raise ValueError(f"Missing {field} in city ASR input")
    result["row_level"] = require_codes(result["row_level"], SUBCATEGORIES, "row_level")
    result["emotion"] = require_codes(result["emotion"], EMOTIONS, "emotion")
    result["asr"] = pd.to_numeric(result["asr"], errors="raise")
    if result["asr"].isna().any():
        raise ValueError("Missing ASR values in city ASR input")
    if result.duplicated(["country", "city", "row_level", "emotion"]).any():
        raise ValueError("Duplicate city/subcategory/emotion ASR cells")
    city_sizes = result.groupby(["country", "city"], dropna=False).size()
    expected = len(SUBCATEGORIES) * len(EMOTIONS)
    if len(city_sizes) != 50 or not city_sizes.eq(expected).all():
        raise ValueError(
            f"Expected 50 cities with {expected} canonical ASR cells each; "
            f"found {len(city_sizes)} cities and cell counts "
            f"{city_sizes.value_counts().to_dict()}"
        )
    return result
