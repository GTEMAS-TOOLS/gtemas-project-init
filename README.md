# Business App Init Repo

This repository helps you start enterprise app projects using a consistent "vibe coding" workflow.

## Goal

- Input: `business` + `app`
- Output: a new project folder named `business-app` (for example: `healthcare-crm`) with starter docs and config.

## Structure

- `businesses/<business>/business-brief.en.md`: primary business context in English
- `businesses/<business>/business-brief.vi.md`: optional Vietnamese version
- `businesses/<business>/app-catalog.yaml`: app list with priority (`essential`, `important`, `advanced`)
- `businesses/<business>/apps/<app>/init.tech.yaml`: technical initialization config
- `templates/`: standard starter documents
- `generators/create-project.js`: project generator
- `generators/seed-business-catalog.js`: generate popular business/app blueprints
- `generated-projects/`: generated projects

## Quick Start

```bash
npm run seed-catalog
npm run init-project -- --business healthcare --app crm --lang en --theme corporate
```

Generated output:

```text
generated-projects/healthcare-crm/
```

## Current Catalog

- Businesses: 30
- App blueprints: 297

Matrix summary (Priority levels):

- `essential`: should be implemented first
- `important`: phase 2 after core operations are stable
- `advanced`: scale/optimization layer

## Standard Document Set

1. `SOLUTION_BRIEF.md`
2. `PRD.md`
3. `USER_STORIES.md`
4. `ARCHITECTURE.md`
5. `ROADMAP.md`
6. `NFR_SECURITY.md`
7. `DATA_MODEL.md`

## Language Convention

- Prompt/input can be Vietnamese.
- File names and technical keys are English.
- Business description files are English-first, with optional Vietnamese companion file.
- Generated document content can be English or bilingual (EN/VI).

## Theme Convention

- `theme` is metadata used for prompt styling and UI direction.
- Current defaults: `corporate`, `modern`, `minimal`.
