import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'yaml';

export interface Resume {
  name: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  summary: string;
  experience: {
    title: string;
    organization: string;
    date: string;
    location: string;
    details: string[];
  }[];
  skills: { area: string; items: string[] }[];
  projects: { title: string; url: string; details: string[] }[];
  publications: {
    title: string;
    authors: string[];
    bold_author: string;
    venue: string;
    year: string;
    doi: string;
    details: string[];
  }[];
  education: {
    institution: string;
    date: string;
    location: string;
    degrees: { type: string; field: string }[];
  }[];
}

export const resume: Resume = parse(readFileSync(resolve('resume-typst/resume.yaml'), 'utf8'));
