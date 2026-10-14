---
layout: page
title: FengWu-4DVar
description: Differentiable cyclic weather forecasting and assimilation.
importance: 1
category: research
---

Coupled the differentiable FengWu weather model with four-dimensional variational assimilation to build an observation-driven cyclic forecast–assimilation system. Automatic differentiation replaces hand-coded adjoints, while spectral background-error approximation and temporal aggregation support efficient optimization. The system demonstrated stable one-year cycling under sparse simulated observations, with a six-hour assimilation step taking approximately 29 seconds on a single A100 GPU.

[Read the paper](https://proceedings.mlr.press/v235/xiao24a.html).

[Code on GitHub](https://github.com/xiaoyi018/FengWu-4DVar).

[All research projects]({{ '/projects/' | relative_url }}) · [All publications]({{ '/publications/' | relative_url }}).
