# Heat Perception: Open Materials and Interactive Visualisation

This repository provides the open materials accompanying the manuscript:

***Attention–emotion signatures of urban heat perception***  
Meizi You, Tianren Yang, Jianxiang Huang, Waishan Qiu, Zhengyu Yang, ChengHe Guan, Yuming Guo and John S. Ji

**Manuscript Status:** Under review at *Nature Climate Change*.

## Interactive Visualisation Webpage

The interactive visualisation webpage is available at:

[https://meiziyou-research.github.io/Heat-Perception-2/](https://meiziyou-research.github.io/Heat-Perception-2/)

The webpage provides browsable visualisations of the attention taxonomy, validation examples, city-level attention–emotion signatures and derived JSON data used for visualisation. It is intended to facilitate inspection of the revised analysis during peer review and support future reuse.

## Repository Purpose

This repository contains three types of materials:

1. **Interactive visualisation materials** used by the project webpage.
2. **Classification audit materials** supporting the LLM-based closed-set classification workflow, including the complete attention–emotion codebook, structured codebook tables, prompt variants and representative validation examples.
3. **Source data and supplementary materials** supporting the figures, tables and analyses reported in the manuscript.

The repository is designed to support transparency during peer review and enable readers to inspect how the attention–emotion classification system was constructed, implemented and validated.

## Repository Structure

```text
Heat-Perception-2/
├── README.md
├── DATA_AVAILABILITY.md
├── CODE_AVAILABILITY.md
├── UPLOAD_TO_GITHUB.md
│
├── codebook/
│   ├── README.md
│   ├── codebook_full_attention_emotion.txt
│   ├── Supplementary_Table_1_attention_taxonomy.csv
│   └── Supplementary_Table_2_emotion_scheme.csv
│
├── prompts/
│   ├── README.md
│   ├── attention/
│   │   ├── att_v0_full_codebook.txt
│   │   ├── att_v1_labels_only.txt
│   │   ├── att_v2_production_fewshot.txt
│   │   ├── att_v3_minimal.txt
│   │   └── att_v4_expert_role.txt
│   └── emotion/
│       ├── emo_v0_full_codebook.txt
│       ├── emo_v1_labels_only.txt
│       ├── emo_v2_production_fewshot.txt
│       ├── emo_v3_minimal.txt
│       └── emo_v4_expert_role.txt
│
├── validation_examples/
│   ├── README.md
│   └── Supplementary_Table_19_representative_examples_revised.xlsx
│
├── source_data/
│   ├── README.md
│   ├── Source_Data_Fig_2.xlsx
│   ├── Source_Data_Fig_3.xlsx
│   ├── Source_Data_Fig_4.xlsx
│   ├── Source_Data_Fig_5.xlsx
│   └── Source_Data_Fig_6.xlsx
│
├── data/
│   └── Derived JSON files used by the interactive webpage
│
└── assets/
    └── Static assets used by the interactive webpage
```

## Codebook

The classification codebook comprises three linked materials:

- **Complete Coding Manual**  
  [`codebook/codebook_full_attention_emotion.txt`](codebook/codebook_full_attention_emotion.txt)  
  A complete plain-text coding manual covering the task scope, annotator role, inclusion and exclusion criteria, single-label decision rules, definitions of all 24 attention subcategories and seven emotion categories, the required output schema and a quality-control checklist.

- **Attention Taxonomy**  
  [`codebook/Supplementary_Table_1_attention_taxonomy.csv`](codebook/Supplementary_Table_1_attention_taxonomy.csv)  
  A structured table describing the 24 attention subcategories, including their parent channels, theoretical anchors, operational definitions and theoretical roles.

- **Emotion Classification Scheme**  
  [`codebook/Supplementary_Table_2_emotion_scheme.csv`](codebook/Supplementary_Table_2_emotion_scheme.csv)  
  A structured table describing the seven emotion categories, including their core appraisals, narrative roles and illustrative cues.

## Prompt Variants

The [`prompts/`](prompts/) folder contains the attention and emotion prompt variants evaluated in the prompt-ablation analyses.

The same five prompt configurations were evaluated for both attention and emotion classification:

| Variant | Description |
|:---:|---|
| V0 | Full codebook definitions and decision rules |
| V1 | Label names only |
| V2 | Full codebook definitions with annotated examples |
| V3 | Minimal task instructions |
| V4 | Domain-expert role framing |

The production prompt used in the main classification workflow was **V2**.

## Validation Examples

The [`validation_examples/`](validation_examples/) folder contains paraphrased representative examples, difficult boundary cases and cross-model consensus-error cases.

These materials improve the transparency and auditability of the classification workflow without redistributing the original text of Twitter/X posts.

## Source Data

The [`source_data/`](source_data/) folder contains the numerical source data underlying Figures 2–6 of the manuscript.

Each Excel workbook is organised by figure and contains the data required to reproduce the corresponding visualised results.

## Supplementary Materials

The [`supplementary/`](supplementary/) folder contains the Supplementary Information document and extracted supplementary tables in reusable formats.

## Data Availability

Raw Twitter/X posts are not redistributed because of platform data-use restrictions.

This repository provides:

- the complete classification codebook;
- all prompt variants evaluated in the prompt-ablation analyses;
- paraphrased validation examples;
- figure-level source data;
- extracted supplementary tables; and
- derived JSON files used by the interactive visualisation.

These materials support auditing and reuse of the classification workflow without redistributing restricted original post content.

For further details, see [`DATA_AVAILABILITY.md`](DATA_AVAILABILITY.md).

## Code Availability

Code and materials used to generate the interactive visualisation are provided in this repository.

The [`data/`](data/) folder contains derived JSON files used by the webpage, while the [`assets/`](assets/) folder contains static webpage assets.

For further details, see [`CODE_AVAILABILITY.md`](CODE_AVAILABILITY.md).

## Contact

For questions concerning the research materials or classification workflow, please contact:

**Meizi You**  
Email: [meizi.you2026@gmail.com](mailto:meizi.you2026@gmail.com)

**John S. Ji**  
Email: [johnji@tsinghua.edu.cn](mailto:johnji@tsinghua.edu.cn)

## Website and Visualisation Development

The interactive webpage and associated visualisations were developed by Waishan Qiu, Laipeng Xu and Meizi You.

## Funding

This research was supported by the **2025–2026 Dissertation Scholarship of the Peking University–Lincoln Institute Center for Urban Development and Land Policy**.

## Local Preview

To preview the interactive webpage locally, clone or download this repository and run the following command from the repository root:

```bash
python -m http.server 8000
```

Then open the following address in a web browser:

```text
http://localhost:8000
```

## Citation

Citation information will be added after publication of the manuscript.
