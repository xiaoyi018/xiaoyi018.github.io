---
layout: page
permalink: /publications/
title: Publications
description: Selected publications, preprints, and conference abstracts.
nav: true
nav_order: 2
---

The lists below distinguish full papers and preprints from conference abstracts. Preprints are labeled with their current public status.

{% include bib_search.liquid %}

<div class="publications">
<h2 id="first-author">First-author publications and preprints</h2>
{% bibliography --query @*[selected=true]* %}

<h2 id="coauthored">Selected co-authored publications</h2>
{% bibliography --query @*[category=coauthor]* %}

<h2 id="abstracts">Conference abstracts</h2>
{% bibliography --query @*[category=abstract]* %}
</div>
