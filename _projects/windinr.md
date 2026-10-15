---
layout: page
title: WindINR
description: Continuous local wind query and correction in complex terrain.
img: assets/img/research/windinr.png
importance: 4
category: research
---

<figure>
  <a href="{{ '/assets/img/research/windinr.png' | relative_url }}">
    <img src="{{ '/assets/img/research/windinr.png' | relative_url }}" alt="Terrain, coarse wind forecasts and UAV observations support continuous local wind queries for a helicopter approach in complex terrain." width="1188" height="474" style="max-width: 100%; height: auto; background: white;" loading="lazy">
  </a>
  <figcaption>Figure 1 from the supplied WindINR preprint.</figcaption>
</figure>

Represents local wind as a conditional implicit neural field, using terrain descriptors, background forecasts, and continuous coordinates. Sparse station or UAV observations correct a compact latent physical state while network weights remain fixed. This separates reusable representation learning from efficient online inference and supports wind queries at arbitrary coordinates.

[Read the paper](https://arxiv.org/abs/2605.09511).

[Code on GitHub](https://github.com/xiaoyi018/windinr).

[All research projects]({{ '/projects/' | relative_url }}) · [All publications]({{ '/publications/' | relative_url }}).
