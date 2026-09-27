# Analysis

The scripts are numbered in analysis order. Use `--help` with Python scripts; R script arguments are shown in their first lines.

| Scripts | Output |
| --- | --- |
| `01`–`03` | Classification metrics, attention–emotion coupling and emotional composition |
| `04`–`05` | City-level outcomes and model input |
| `06`–`08` | Correlate screening, rankings and partial regressions |
| `09`–`12` | ASR-threshold, geographic, descriptive and leave-one-city-out analyses |

The classified-post input uses `country`, `city`, `Attention`, `Attention_sub` and `Emotion_gpt`. The city ASR input uses `country`, `city`, `row_var`, `row_level`, `emotion`, `asr`, `n_group` and candidate-correlate columns. The climate mapping uses `country`, `city` and `koppen_subtype_confirmed`. Validation inputs comprise the 800-post cohort, adjudicated reference labels and model predictions, joined by `sample_id`.

The 38 candidate correlates are:

- Climatic heat regime: `temp`, `dtr`, `hot_night_days_m2`, `hot_day_days_m2`.
- Urban environmental structure: `ndvi`, `nightlight`, `gini_summe`, `gexpo1km`.
- Socio-demographic context: `income_z`, `prop_over65`, `pop`.
- Governance: `cgi`, `hgi`, `tgi`.
- 15-min accessibility: `w_`, `p_` and `c_` versions of `health`, `communit`, `educatio`, `food`, `nightlif`, `mobility`, `active` and `pois`.
