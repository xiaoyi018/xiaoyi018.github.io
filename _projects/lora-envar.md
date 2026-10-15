---
layout: page
title: LoRA-EnVar
description: Parameter-efficient adaptation of generative ensemble priors.
img: assets/img/research/lora-envar.png
importance: 3
category: research
---

<figure>
  <a href="{{ '/assets/img/research/lora-envar.png' | relative_url }}">
    <img src="{{ '/assets/img/research/lora-envar.png' | relative_url }}" alt="A VAE learns a climatological prior offline; low-rank decoder adapters update it online using flow-dependent ensemble error samples." width="1188" height="939" style="max-width: 100%; height: auto; background: white;" loading="lazy">
  </a>
  <figcaption>Figure 1 from the NeurIPS paper.</figcaption>
</figure>

Combines a climatological VAE prior with flow-dependent ensemble perturbations through online low-rank adaptation. Updating only decoder adapters allows the prior to adjust to the current forecast uncertainty while reducing online trainable parameters by more than three orders of magnitude compared with full-decoder fine-tuning.

[Read the paper](https://proceedings.nips.cc/paper_files/paper/2025/hash/413885e70482b95dcbeeddc1daf39177-Abstract-Conference.html).

[All research projects]({{ '/projects/' | relative_url }}) · [All publications]({{ '/publications/' | relative_url }}).

[Conference poster and presentation](https://neurips.cc/virtual/2025/loc/mexico-city/poster/115029).
