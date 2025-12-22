# @zh2s/eslint-config-fsd

> **Strict, modern, and customizable ESLint config for Feature-Sliced Design (FSD)** — fully rewritten in TypeScript, enhanced with numeric layer ordering, and built for ESLint 9 with flat config support.

This ESLint configuration package extends the official [`@feature-sliced/eslint-config`](https://github.com/feature-sliced/eslint-config) with practical improvements tailored for real-world TypeScript projects following the [Feature-Sliced Design](https://feature-sliced.design/) methodology.

## ✨ Features

- ✅ **Written in TypeScript** — full type safety and maintainability
- 🔢 **Numeric layer prefixes** — enforces FSD structure like `1-app`, `2-pages`, `3-widgets`, `4-feature`, `5-entities`, `6-shared` etc., for correct filesystem sorting
- 🧱 **ESLint 9 + Flat Config** — native support for the modern flat configuration format (`eslint.config.js`)
- 🧩 **Modular ruleset** — use the full config or import only what you need:
  - `publicApi` — validates proper public API exports (`index.ts`)
  - `importOrder` — enforces consistent import ordering and grouping
  - `layersSlices` — restricts illegal cross-layer/slice dependencies (with numeric layer awareness)
- 📦 **Up-to-date dependencies** — all plugins and peer deps are regularly updated

## 📦 Installation

```bash
npm install --save-dev @zh2s/eslint-config-fsd
```

## 🛠️ Usage

### Full configuration

```TypeScript
import fsdEslintConfig from "@zh2s/eslint-config-fsd";

export default [
  fsdEslintConfig.flatConfig,
  // Add your project-specific overrides here if needed
];
```

### Compose your own config

```TypeScript
import { ESLint, Linter } from 'eslint'; // for layersSlices rules
import fsdEslintConfig from "@zh2s/eslint-config-fsd";
import importPlugin from 'eslint-plugin-import'; // for publicApi rules
import boundaries from 'eslint-plugin-boundaries'; // for layersSlices rules

const boundariesPlugin = boundaries as unknown as ESLint.Plugin;

export default [
  // your eslint configuration
  importPlugin.flatConfigs.recommended, // for publicApi and importOrder rules
  {
    plugins: { 
      ...fsdEslintConfig.plugins // for layersSlices rules
    }, 
    settings: {
      ...fsdEslintConfig.settings,  // for layersSlices rules
    },
    rules: {
      ...fsdEslintConfig.rules.publicApi,
      ...fsdEslintConfig.rules.layersSlices,
      ...fsdEslintConfig.rules.importOrder,
   }
  }
];
```

### ⚠️ Note

Please note that when using separate rules, you will need to manually import `importPlugin` and `boundaries`. Please review the example above carefully it shows the correct configuration.

## 📁 Expected Project Structure

```md
src/
├── 1-app/
├── 2-pages/
├── 3-widgets/
├── 4-features/
├── 5-entities/
└── 6-shared/
```
