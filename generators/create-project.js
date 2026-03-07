#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const key = argv[i];
    const value = argv[i + 1];
    if (key.startsWith('--') && value && !value.startsWith('--')) {
      args[key.slice(2)] = value;
      i += 1;
    }
  }
  return args;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
}

function main() {
  const root = process.cwd();
  const args = parseArgs(process.argv);

  const business = (args.business || '').toLowerCase();
  const app = (args.app || '').toLowerCase();
  const language = (args.lang || 'en').toLowerCase();
  const theme = (args.theme || 'corporate').toLowerCase();
  const allowedLanguages = new Set(['en', 'vi']);
  const allowedThemes = new Set(['corporate', 'modern', 'minimal']);

  if (!business || !app) {
    console.error('Usage: node generators/create-project.js --business <name> --app <name> [--lang en|vi] [--theme corporate|modern|minimal]');
    process.exit(1);
  }

  if (!allowedLanguages.has(language)) {
    console.error(`Unsupported language: ${language}. Supported values: en, vi.`);
    process.exit(1);
  }

  if (!allowedThemes.has(theme)) {
    console.error(`Unsupported theme: ${theme}. Supported values: corporate, modern, minimal.`);
    process.exit(1);
  }

  const businessDir = path.join(root, 'businesses', business);
  const appDir = path.join(businessDir, 'apps', app);
  const briefEnPath = path.join(businessDir, 'business-brief.en.md');
  const briefViPath = path.join(businessDir, 'business-brief.vi.md');
  const initPath = path.join(appDir, 'init.tech.yaml');

  if (!fs.existsSync(businessDir)) {
    console.error(`Business not found: ${business}`);
    process.exit(1);
  }

  if (!fs.existsSync(appDir)) {
    console.error(`App not found under business ${business}: ${app}`);
    process.exit(1);
  }

  if (!fs.existsSync(initPath)) {
    console.error('Missing required source file: init.tech.yaml.');
    process.exit(1);
  }

  const projectFolder = `${business}-${app}`;
  const target = path.join(root, 'generated-projects', projectFolder);

  if (fs.existsSync(target)) {
    console.error(`Target already exists: generated-projects/${projectFolder}`);
    process.exit(1);
  }

  ensureDir(target);
  ensureDir(path.join(target, 'docs'));
  ensureDir(path.join(target, 'context'));
  ensureDir(path.join(target, 'context', 'briefs'));

  const templatesDir = path.join(root, 'templates');
  const templates = [
    'SOLUTION_BRIEF.md',
    'PRD.md',
    'USER_STORIES.md',
    'ARCHITECTURE.md',
    'ROADMAP.md',
    'NFR_SECURITY.md',
    'DATA_MODEL.md',
  ];

  templates.forEach((file) => {
    copyFile(path.join(templatesDir, file), path.join(target, 'docs', file));
  });

  const briefCandidates = {
    en: briefEnPath,
    vi: briefViPath,
  };
  const selectedBriefPath = fs.existsSync(briefCandidates[language])
    ? briefCandidates[language]
    : (fs.existsSync(briefEnPath) ? briefEnPath : briefViPath);

  if (!selectedBriefPath || !fs.existsSync(selectedBriefPath)) {
    console.error('Missing business brief files. Expected business-brief.en.md or business-brief.vi.md.');
    process.exit(1);
  }

  if (fs.existsSync(briefEnPath)) {
    copyFile(briefEnPath, path.join(target, 'context', 'briefs', 'business-brief.en.md'));
  }
  if (fs.existsSync(briefViPath)) {
    copyFile(briefViPath, path.join(target, 'context', 'briefs', 'business-brief.vi.md'));
  }

  copyFile(selectedBriefPath, path.join(target, 'context', `business-brief.${language}.md`));
  copyFile(initPath, path.join(target, 'context', 'init.tech.yaml'));

  const projectOptions = `language: ${language}\ntheme: ${theme}\n`;
  fs.writeFileSync(path.join(target, 'context', 'project-options.yaml'), projectOptions, 'utf8');

  const readme = `# ${projectFolder}\n\nGenerated starter project.\n\n## Selected\n- business: ${business}\n- app: ${app}\n- language: ${language}\n- theme: ${theme}\n\n## Included\n- docs/*.md\n- context/briefs/business-brief.en.md (if available)\n- context/briefs/business-brief.vi.md (if available)\n- context/business-brief.${language}.md\n- context/init.tech.yaml\n- context/project-options.yaml\n`;

  fs.writeFileSync(path.join(target, 'README.md'), readme, 'utf8');

  console.log(`Created: generated-projects/${projectFolder}`);
}

main();
