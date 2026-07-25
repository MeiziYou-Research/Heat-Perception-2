# Heat Perception: Open Materials and Interactive Visualisation

This repository provides open materials accompanying the manuscript:

**Attention–emotion signatures of urban heat perception**  
Meizi You, Tianren Yang, Jianxiang Huang, Waishan Qiu, Zhengyu Yang, ChengHe Guan, Yuming Guo, and John S. Ji

**Submission and review status:** Manuscript submitted to *Nature Climate Change* and currently under review.

## Interactive visualisation webpage

The interactive visualisation webpage can be accessed at:

**https://meiziyou-research.github.io/Heat-Perception-2/**

This webpage provides browsable visualisations of the attention taxonomy, validation examples, city-level attention–emotion signatures and derived JSON files used for visualisation. It is intended to make the revised analysis easier to inspect during peer review and future reuse.

## Repository purpose

This repository contains two types of materials:

1. **Interactive visualisation materials** used for the project webpage.
2. **Audit materials** supporting the LLM-based closed-set classification workflow, including the full attention–emotion codebook, structured supplementary codebook tables, prompt variants and representative validation examples.

The repository is designed to support transparency during peer review and to help readers inspect how the attention–emotion classification system was constructed, implemented and validated.

## Repository structure

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
├── supplementary/
│   ├── README.md
│   ├── Supplementary_Information.docx
│   └── extracted_tables/
│       ├── Supplementary_Table_01.csv
│       ├── Supplementary_Table_02.csv
│       └── ...
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

The classification codebook consists of three linked materials:

* `codebook/codebook\\\_full\\\_attention\\\_emotion.txt`  
A complete plain-text coding manual with task scope, annotator role, inclusion/exclusion rules, single-label decision rules, all 24 attention definitions, all seven emotion definitions, output schema and quality-control checklist.
* `codebook/Supplementary\\\_Table\\\_1\\\_attention\\\_taxonomy.csv`  
Structured table version of the 24 attention subcategories, including parent channels, theoretical anchors, operational definitions and theoretical roles.
* `codebook/Supplementary\\\_Table\\\_2\\\_emotion\\\_scheme.csv`  
Structured table version of the seven emotion labels, including core appraisals, narrative roles and illustrative cues.

## Prompt variants

The `prompts/` folder contains the attention and emotion prompt variants used in prompt-ablation analyses.

For both attention and emotion classification:

|Variant|Description|
|-|-|
|V0|Full codebook definitions and decision rules|
|V1|Label names only|
|V2|Full codebook definitions plus annotated examples|
|V3|Minimal instruction|
|V4|Domain-expert role frame|

The production prompt used for the main classification workflow was **V2**.

## Validation examples

The `validation\\\_examples/` folder contains paraphrased representative examples, difficult boundary cases and cross-model consensus-error cases. These examples improve transparency while avoiding redistribution of original Twitter/X post text.

## Data availability

Raw Twitter/X posts are not redistributed because of platform data-use restrictions. This repository provides codebook materials, prompt variants, derived visualisation JSON files, supplementary tables and paraphrased validation examples that support auditability of the classification workflow and the interactive visualisation.

## Contacts and contributions

**Research contact**  
Meizi You, John S. Ji
Email: **meizi.you2026@gmail.com**, **johnji@tsinghua.edu.cn**

**Visualisation development**  
Waishan Qiu, Laipeng Xu, and Meizi You

## Funding

This research was supported by the **2025–2026 Dissertation Scholarship of the Peking University–Lincoln Institute Center for Urban Development and Land Policy**.

## Local preview

To preview the webpage locally:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

