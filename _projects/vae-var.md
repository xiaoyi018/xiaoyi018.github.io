---
layout: page
title: VAE-Var
description: Generative non-Gaussian priors for data assimilation.
img: assets/img/research/vae-var.png
importance: 2
category: research
---

<figure>
  <a href="{{ '/assets/img/research/vae-var.png' | relative_url }}">
    <img src="{{ '/assets/img/research/vae-var.png' | relative_url }}" alt="VAE-Var uses a VAE decoder to transform a latent state into an analysis increment and updates that state using observation and background losses." width="1240" height="1328" style="max-width: 100%; height: auto; background: white;" loading="lazy">
  </a>
  <figcaption>Inference diagram from the ICLR 2025 poster.</figcaption>
</figure>

Uses a variational autoencoder to represent non-Gaussian background errors and its decoder as a nonlinear transform for variational data assimilation. The method accommodates differentiable observation operators and sparse, irregular, off-grid observations. Evaluation includes sparse ERA5 simulations and one-year cyclic assimilation with real GDAS prepbufr observations.

[Read the paper](https://proceedings.iclr.cc/paper_files/paper/2025/hash/9ddd5928df79a1f140ba4076978cb3ed-Abstract-Conference.html).

[Code on GitHub](https://github.com/xiaoyi018/VAE-Var).

[All research projects]({{ '/projects/' | relative_url }}) · [All publications]({{ '/publications/' | relative_url }}).

[View full ICLR 2025 poster (PDF)]({{ '/assets/pdf/VAE-Var_ICLR2025_Poster.pdf' | relative_url }}).
