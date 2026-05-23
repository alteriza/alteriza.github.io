---
layout: null
---
[
  {% for post in site.posts %}
    {
      "title": {{ post.title | jsonify }},
      "url": {{ post.url | relative_url | jsonify }},
      "date": {{ post.date | date: "%d %b %Y" | jsonify }},
      "content": {{ post.content | strip_html | normalize_whitespace | jsonify }}
    }{% unless forloop.last %},{% endunless %}
  {% endfor %}
]
