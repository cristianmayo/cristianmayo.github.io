---
title: Understanding Frontmatter in Static Sites
date: 2024-01-25
category: Web Development
tags: [frontmatter, markdown, yaml]
excerpt: Learn how to use frontmatter to add metadata to your blog posts and control how they're displayed.
---

# Understanding Frontmatter

Frontmatter is a powerful feature that allows you to add metadata to your markdown files. It's written in YAML and sits at the top of your file between triple dashes.

## Basic Structure

```yaml
---
title: Your Title
date: 2024-01-25
tags: [tag1, tag2]
---
```

## Common Fields

### Title
The title of your post that appears in headings and metadata.

### Date
The publication date, used for sorting and permalink generation.

### Category
Group your posts by topic or subject matter.

### Tags
Add multiple tags to make content discoverable.

### Excerpt
A short description shown on listing pages.

## Advanced Usage

You can also add custom fields:

```yaml
---
author: John Doe
featured: true
image: /img/post-image.jpg
---
```

These fields become available in your templates for conditional rendering and styling.
