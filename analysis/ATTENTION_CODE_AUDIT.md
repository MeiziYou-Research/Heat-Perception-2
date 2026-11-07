# Attention-subcategory code audit

The public codebook (`codebook/Extended_Data_Table_1_attention_taxonomy.csv` and `codebook/codebook_full_attention_emotion.txt`) defines the systems/climate subcategories as S11, S21, S22, S31, S41, S42, S43 and S44. V-prefixed identifiers are not part of this taxonomy.

| Public file | Correction |
| --- | --- |
| `02_attention_emotion_coupling.py` | Replaced V codes in the subcategory table and removed V-to-S display recoding; added input-label and row-count checks before ASR calculation. |
| `04_city_level_analysis.py` | Replaced V-derived continuous and binary outcome names with S names; added complete 50-city subcategory–emotion grid validation. |
| `06_screening_models.R` | Updated model outcome fields to S and reject legacy V columns or missing canonical outcomes. |
| `10_geographic_robustness.py` | Updated binary outcome fields and display mapping to S. |
| `11_descriptive_diagnostics.py` | Updated Extended Data Fig. 3 mappings to S and removed V-to-S display recoding. |
| `12_loo_stability.R` | Updated binary outcome fields to S and reject legacy V fields in city and model inputs. |
| `attention_taxonomy.py` | Centralised the canonical 24 subcategory codes and seven emotion labels with strict input checks. |
| `index.html`, `webpage/assets/scene4_asr_city_status.inline.js`, `webpage/data/city_summary.inline.js` | Renamed 806 matching machine keys from V to S; retained all values and visible chart wording. |
| `source_data/Source_data.xlsx` | Renamed seven text cells only: three V41/V43 labels in Extended Data Fig. 3a and four V42 labels in Extended Data Fig. 3b. |

The Excel workbook was compared cell by cell across all 21 sheets: 3,143 numeric cells, 126 Boolean cells, and all other non-target text and styles were unchanged. Synthetic contract tests (`python -m unittest discover -s analysis/tests -p 'test_attention_codes.py'`) passed: canonical S records are retained in the contingency table, V labels are rejected, downstream fields align, E31's corrected rule yields 14 positives in the constructed fixture, and geography generates 102 comparisons. Python, R and website JavaScript syntax checks passed.

This audit is limited to files in the public repository. Restricted post-level and city-level inputs are not in the repository, so analyses were **not** rerun from original posts. Consequently, equality of recomputed ASRs, city prevalences, partial R² values and P values with the published results is **not independently verified** here. The published Source Data's statistical numbers themselves were not changed.
