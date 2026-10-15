---
layout: page
title: FengWu-4DVar
description: Differentiable cyclic weather forecasting and assimilation.
img: assets/img/research/fengwu-4dvar.png
importance: 1
category: research
---

<figure>
  <a href="{{ '/assets/img/research/fengwu-4dvar.png' | relative_url }}">
    <img src="{{ '/assets/img/research/fengwu-4dvar.png' | relative_url }}" alt="The FengWu forecast–assimilation cycle combines observations with an AI forecast background and then predicts from the analysis state." width="1350" height="710" style="max-width: 100%; height: auto; background: white;" loading="lazy">
  </a>
  <figcaption>Framework diagram from the official ICML 2024 poster.</figcaption>
</figure>

Coupled the differentiable FengWu weather model with four-dimensional variational assimilation to build an observation-driven cyclic forecast–assimilation system. Automatic differentiation replaces hand-coded adjoints, while spectral background-error approximation and temporal aggregation support efficient optimization. The system demonstrated stable one-year cycling under sparse simulated observations, with a six-hour assimilation step taking approximately 29 seconds on a single A100 GPU.

[Read the paper](https://proceedings.mlr.press/v235/xiao24a.html).

[Code on GitHub](https://github.com/xiaoyi018/FengWu-4DVar).

[All research projects]({{ '/projects/' | relative_url }}) · [All publications]({{ '/publications/' | relative_url }}).

[Conference poster and presentation](https://icml.cc/virtual/2024/poster/33791).
