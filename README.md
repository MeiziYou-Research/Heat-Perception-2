# Heat Perception: Open Materials and Interactive Visualisation

This repository provides the open materials accompanying the manuscript:

***Attention–emotion signatures of urban heat perception***  
Meizi You, Tianren Yang, Jianxiang Huang, Waishan Qiu, Zhengyu Yang, ChengHe Guan, Yuming Guo and John S. Ji

**Manuscript status:** Under review at *Nature Climate Change*.

## Interactive Visualisation Webpage

The interactive visualisation webpage is available at:

[https://meiziyou-research.github.io/Heat-Perception-2/](https://meiziyou-research.github.io/Heat-Perception-2/)

The webpage provides browsable visualisations of the attention taxonomy, validation examples, city-level attention–emotion signatures and derived JSON data. It is intended to facilitate inspection of the revised analysis during peer review and support future reuse.

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
