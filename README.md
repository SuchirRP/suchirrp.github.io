# suchirrp.github.io

Resume site and blog, built with Astro and deployed to GitHub Pages.

- Clone with `git clone --recurse-submodules`, because the resume lives in the `resume-typst` submodule.
- `npm install`, then `npm run dev` to run it locally. This needs [Typst](https://typst.app) for the resume PDF.

## Writing a post

Add `src/content/blog/<post-url>/index.md`, with any images beside it:

```yaml
---
title: Post title
date: 2026-11-04
summary: One line for the blog list.
tags: [space]      # optional
pinned: false      # optional
draft: true        # optional: only visible when running locally
---
```

Commit and push to publish. Keep the folder name stable, because comments are matched to the post's URL.
