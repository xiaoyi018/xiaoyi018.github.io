---
layout: page
title: LoRA-EnVar
description: Parameter-efficient adaptation of generative ensemble priors.
importance: 3
category: research
---

Combines a climatological VAE prior with flow-dependent ensemble perturbations through online low-rank adaptation. Updating only decoder adapters allows the prior to adjust to the current forecast uncertainty while reducing online trainable parameters by more than three orders of magnitude compared with full-decoder fine-tuning.

[Read the paper](https://proceedings.nips.cc/paper_files/paper/2025/hash/413885e70482b95dcbeeddc1daf39177-Abstract-Conference.html).

[All research projects]({{ '/projects/' | relative_url }}) · [All publications]({{ '/publications/' | relative_url }}).
