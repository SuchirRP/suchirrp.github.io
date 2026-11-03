---
title: One YAML file for my resume and this site
date: 2026-11-03
summary: How a Typst resume and an Astro site came to share one data file, and the missing tildes that turned up along the way.
tags: [typst, astro]
pinned: true
draft: true
---

My resume used to live entirely in Typst markup, which made a nice PDF and left a website with nothing to read. Moving the content into a YAML file gave both of them one source.

## The layout stays in Typst

The Typst file now only controls how the PDF looks. It reads the data and loops over each section:

```typst
#let data = yaml("resume.yaml")

#for job in data.experience {
  exp(title: job.title, details: bullets(job.details))
}
```

## The missing tildes

The conversion also turned up an old bug. I had written `~1,000` in several places, but in Typst markup a tilde is a non-breaking space, so the PDF had been printing a plain `1,000`.

> Plain values in YAML mean a tilde is just a tilde.

Moving to YAML changed three things:

- The PDF and the site can't drift apart
- Approximate figures now print as approximate
- Editing the resume no longer means editing layout code
