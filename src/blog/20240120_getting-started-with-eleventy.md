---
title: Getting Started with Eleventy
date: 2024-01-20
category: Web Development
tags: [eleventy, jamstack, tutorial]
excerpt: A comprehensive guide to getting started with Eleventy, the simple static site generator.
---

# Getting Started with Eleventy

Eleventy is a simpler static site generator that's flexible and powerful. In this post, we'll explore why Eleventy is a great choice for your next project.

## Why Eleventy?

1. **Simple** - No complex configuration required
2. **Flexible** - Use any template language
3. **Fast** - Builds are lightning quick
4. **Zero Config** - Works out of the box

## Installation

Getting started is easy:

```bash
npm install @11ty/eleventy
```

## Your First Template

Create an `index.njk` file:

```nunjucks
---
title: Home Page
---

<h1>{{ title }}</h1>
<p>Welcome to my site!</p>
```

## Running Eleventy

Start the development server:

```bash
npx eleventy --serve
```

That's it! Your site is now running at `localhost:8080`.
