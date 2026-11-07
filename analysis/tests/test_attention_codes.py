"""Synthetic contract tests; no restricted posts or city ASRs are used."""

import importlib
import sys
import unittest
from pathlib import Path

import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
taxonomy = importlib.import_module("attention_taxonomy")
coupling = importlib.import_module("02_attention_emotion_coupling")
city_module = importlib.import_module("04_city_level_analysis")
model_input = importlib.import_module("05_prepare_model_input")
geography = importlib.import_module("10_geographic_robustness")
diagnostics = importlib.import_module("11_descriptive_diagnostics")


def synthetic_asr():
    locations = (
        [("Australia", city) for city in ("Brisbane", "Melbourne", "Perth", "Sydney")]
        + [("Canada", city) for city in ("Calgary", "Edmonton", "London", "Ottawa", "Toronto", "Vancouver", "Winnipeg")]
        + [("United Kingdom", city) for city in ("Birmingham", "Bristol", "Leeds", "Liverpool", "London", "Manchester", "Sheffield")]
        + [("United States", city) for city in sorted(geography.US_EAST | geography.US_WEST | geography.US_GULF_SOUTH | geography.US_MIDWEST)]
    )
    assert len(locations) == 50
    rows = []
    for index, (country, city) in enumerate(locations):
        for code in taxonomy.SUBCATEGORIES:
            for emotion in taxonomy.EMOTIONS:
                value = 2.0 if code == "E31" and emotion == "Joy" and index < 14 else 0.0
                rows.append((country, city, "attention_sub", code, emotion, value, 100, float(index + 1)))
    return pd.DataFrame(rows, columns=("country", "city", "row_var", "row_level", "emotion", "asr", "n_group", "temp"))


class AttentionCodeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.long = synthetic_asr()

    def test_canonical_crosstab_retains_systems_records(self):
        posts = pd.DataFrame({"attention_sub": ["E11", "S11", "S42", "S44"],
                              "emotion_gpt": ["Joy", "Fear", "Anger", "Neutral"]})
        table = coupling.contingency(posts, "attention_sub", "emotion_gpt", taxonomy.SUBCATEGORIES)
        self.assertEqual(int(table.to_numpy().sum()), 4)
        self.assertEqual(int(table.loc[["S11", "S42", "S44"]].to_numpy().sum()), 3)
        self.assertEqual(len(coupling.pooled_subcategory_asr(posts)), 168)
        posts.loc[1, "attention_sub"] = "V11"
        with self.assertRaisesRegex(ValueError, "unexpected labels"):
            coupling.contingency(posts, "attention_sub", "emotion_gpt", taxonomy.SUBCATEGORIES)

    def test_city_outputs_and_downstream_contracts(self):
        city = city_module.construct_outcomes(self.long)
        self.assertEqual(len(city), 50)
        self.assertEqual(int(city["E31_JoyDominant"].sum()), 14)
        self.assertTrue(set(city_module.CONTINUOUS_OUTCOMES + city_module.BINARY_OUTCOMES) <= set(city))
        self.assertEqual(len(geography.comparisons(geography.city_geographic_states(city))), 102)
        prepared = diagnostics.prepare_asr(self.long)
        self.assertEqual(len(diagnostics.panel_a(prepared)), 14)
        self.assertEqual(len(diagnostics.panel_b(prepared)), 8)
        self.assertEqual(len(diagnostics.panel_c(prepared)), 20)
        model = model_input.prepare(self.long)
        self.assertEqual(len(model), 50)
        self.assertIn("S11_Anger_bin", model)
        self.assertIn("S21_Fear_bin", model)

    def test_incomplete_or_legacy_city_grid_rejected(self):
        with self.assertRaisesRegex(ValueError, "unexpected labels"):
            city_module.construct_outcomes(self.long.assign(row_level=lambda frame: frame.row_level.mask(frame.row_level.eq("S11"), "V11")))
        with self.assertRaisesRegex(ValueError, "ASR cells each"):
            city_module.construct_outcomes(self.long.iloc[1:])


if __name__ == "__main__":
    unittest.main()
