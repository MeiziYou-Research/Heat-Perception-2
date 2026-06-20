# Heat Perception: Open Materials and Interactive Visualisation

This repository provides open materials accompanying the manuscript:

**Attention–emotion signatures of urban heat perception**  
Meizi You, Tianren Yang, Jianxiang Huang, Waishan Qiu, Zhengyu Yang, ChengHe Guan, Yuming Guo, and John S. Ji

**Submission and review status:** Manuscript submitted to *Nature Climate Change* and currently under review.

If you need additional data or have questions about the repository, please contact **Meizi You** at **meizi.you2026@gmail.com**.

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
├── DATA\\\_AVAILABILITY.md
├── CODE\\\_AVAILABILITY.md
├── UPLOAD\\\_TO\\\_GITHUB.md
│
├── codebook/
│   ├── README.md
│   ├── codebook\\\_full\\\_attention\\\_emotion.txt
│   ├── Supplementary\\\_Table\\\_1\\\_attention\\\_taxonomy.csv
│   └── Supplementary\\\_Table\\\_2\\\_emotion\\\_scheme.csv
│
├── prompts/
│   ├── README.md
│   ├── attention/
│   │   ├── att\\\_v0\\\_full\\\_codebook.txt
│   │   ├── att\\\_v1\\\_labels\\\_only.txt
│   │   ├── att\\\_v2\\\_production\\\_fewshot.txt
│   │   ├── att\\\_v3\\\_minimal.txt
│   │   └── att\\\_v4\\\_expert\\\_role.txt
│   └── emotion/
│       ├── emo\\\_v0\\\_full\\\_codebook.txt
│       ├── emo\\\_v1\\\_labels\\\_only.txt
│       ├── emo\\\_v2\\\_production\\\_fewshot.txt
│       ├── emo\\\_v3\\\_minimal.txt
│       └── emo\\\_v4\\\_expert\\\_role.txt
│
├── validation\\\_examples/
│   ├── README.md
│   └── Supplementary\\\_Table\\\_19\\\_representative\\\_examples\\\_revised.xlsx
│
├── supplementary/
│   ├── README.md
│   ├── Supplementary\\\_Information.docx
│   └── extracted tables/
│       ├── Supplementary\\\_Table\\\_01.csv
│       ├── Supplementary\\\_Table\\\_02.csv
│       └── ...
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

For additional data requests, please contact:

**Meizi You**  
Email: **meizi.you2026@gmail.com**

## Contacts and contributions

**Research contact**  
Meizi You  
Email: **meizi.you2026@gmail.com**

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

