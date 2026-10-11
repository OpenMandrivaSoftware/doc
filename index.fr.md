---
title: Documentation OpenMandriva
layout: home
card_columns: 2
lang: fr
---
Bienvenue dans la documentation d'OpenMandriva !

<div class="home-cards cols-{{ page.card_columns }}">
  {% for card in site.data.home_cards %}
  <div class="home-card">
    <h3>
      {% if card.base_url %}
      <a href="/fr{{ card.base_url }}/index.fr.html">{{ card.title }}</a>
      {% else %}
      {{ card.title }}
      {% endif %}
    </h3>
    <div class="description">{{ card.description }}</div>
    <ul>
      {% for link in card.links %}
      {% if link.url %}
        <li><a href="{{ link.url }}">{{ link.name }}</a></li>
      {% elsif link.base_url %}
        <li><a href="/fr{{ link.base_url }}.fr.html">{{ link.name }}</a></li>
      {% endif %}
      {% endfor %}
    </ul>
  </div>
  {% endfor %}
</div>