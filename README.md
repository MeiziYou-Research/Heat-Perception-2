# Heat perception: research materials and interactive visualisation

This repository accompanies *Attention–emotion signatures of urban heat perception* by Meizi You and colleagues. It provides the classification codebook and prompts, paraphrased validation examples, numerical figure source data, validation summaries, and the interactive visualisation. The manuscript is undergoing final editorial preparation; this repository does not claim a publication DOI or acceptance date.

## Find the materials

| Material | Location | Scope |
|---|---|---|
| Attention taxonomy | [`codebook/Extended_Data_Table_1_attention_taxonomy.csv`](codebook/Extended_Data_Table_1_attention_taxonomy.csv) | The 24 attention subcategories; companion to Extended Data Table 1. |
| Detailed attention codebook table | [`codebook/attention_taxonomy_detailed.csv`](codebook/attention_taxonomy_detailed.csv) | Additional theoretical context; not the manuscript's Extended Data Table 1. |
| Emotion scheme | [`codebook/Extended_Data_Table_2_emotion_scheme.csv`](codebook/Extended_Data_Table_2_emotion_scheme.csv) | The seven emotion labels; companion to Extended Data Table 2. |
| Complete coding manual | [`codebook/codebook_full_attention_emotion.txt`](codebook/codebook_full_attention_emotion.txt) | Classification definitions and decision rules. |
| Prompt variants | [`prompts/`](prompts/) | V0–V4 for attention and emotion; V2 was the production configuration. |
| Paraphrased validation examples | [`validation_examples/Supplementary_Table_18_representative_examples.xlsx`](validation_examples/Supplementary_Table_18_representative_examples.xlsx) | Companion workbook for Supplementary Table 18. |
| Figure source data | [`source_data/Source_Data_NCC_Figures.xlsx`](source_data/Source_Data_NCC_Figures.xlsx) | One workbook with separate sheets for main Figs. 2–6 and Extended Data Figs. 1–7. Fig. 1 is conceptual and has no numerical source-data sheet. |
| Validation summaries | [`validation_summary/`](validation_summary/) | Overall model metrics and the country-stratified summary underlying Supplementary Fig. 17. |
| Interactive visualisation | [`index.html`](index.html), [`webpage/`](webpage/) | Website entry point, scripts, styles and assets; [open the hosted page](https://meiziyou-research.github.io/Heat-Perception-2/). |

The source-data workbook contains aggregate and figure-level values, not the original Twitter/X post text or user identifiers. It is the current consolidated version; the earlier split Fig. 2–6 workbooks are superseded. Sheet names follow the published figure numbering.

## Repository layout

```text
Heat-Perception-2/
├── README.md
├── DATA_AVAILABILITY.md
├── CODE_AVAILABILITY.md
├── index.html
├── codebook/
├── prompts/
│   ├── attention/
│   └── emotion/
├── validation_examples/
├── validation_summary/
├── source_data/
└── webpage/
    ├── assets/
    ├── css/
    ├── data/
    ├── js/
    └── vendor/
```

The `webpage/data/` directory contains files used by the interactive page; it is not a substitute for the figure Source Data workbook. Internal website identifiers do not define the manuscript's statistical terminology.

## Reuse and limitations

The numerical source data support inspection of the plotted results. Some analyses depend on restricted post-level data and external geospatial sources; the published workbook alone is not a complete raw-data reproduction package. See [Data Availability](DATA_AVAILABILITY.md) for data access and [Code Availability](CODE_AVAILABILITY.md) for the software currently included. The prompt and validation-example files contain illustrative text; the original post corpus is not redistributed.

To preview the website locally, run `python -m http.server 8000` from the repository root and open <http://localhost:8000/>.

## Contact

For research-material questions, contact Meizi You at <meizi.you2026@gmail.com>.

The interactive webpage and its visualisations were developed by Waishan Qiu, Laipeng Xu and Meizi You. This research was supported by the 2025–2026 Dissertation Scholarship of the Peking University–Lincoln Institute Center for Urban Development and Land Policy.
