---
layout: page
title: WindINR
description: Continuous local wind query and correction in complex terrain.
importance: 4
category: research
---

Represents local wind as a conditional implicit neural field, using terrain descriptors, background forecasts, and continuous coordinates. Sparse station or UAV observations correct a compact latent physical state while network weights remain fixed. This separates reusable representation learning from efficient online inference and supports wind queries at arbitrary coordinates.

[Read the paper](https://arxiv.org/abs/2605.09511).

[Code on GitHub](https://github.com/xiaoyi018/windinr).

[All research projects]({{ '/projects/' | relative_url }}) · [All publications]({{ '/publications/' | relative_url }}).
