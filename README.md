# @zh2s/eslint-config-fsd

> **Strict, modern, and customizable ESLint config for Feature-Sliced Design (FSD)** — fully rewritten in TypeScript, enhanced with numeric layer ordering, and built for ESLint 10 with flat config support.

This ESLint configuration package extends the official [`@feature-sliced/eslint-config`](https://github.com/feature-sliced/eslint-config) with practical improvements tailored for real-world TypeScript projects following the [Feature-Sliced Design](https://feature-sliced.design/) methodology.

## ✨ Features

- ✅ **Written in TypeScript** — full type safety and maintainability
- 🔢 **Numeric layer prefixes** — enforces FSD structure like `1-app`, `2-pages`, `3-widgets`, `4-features`, `5-entities`, `6-shared` etc., for correct filesystem sorting
- 🧱 **ESLint 10 + Flat Config** — native support for the modern flat configuration format (`eslint.config.js`)
- 🧩 **Modular ruleset** — use the full config or import only what you need:
  - `publicApi` — validates proper public API exports (`index.ts`)
  - `importOrder` — enforces consistent import ordering and grouping
  - `layersSlices` — restricts illegal cross-layer/slice dependencies (with numeric layer awareness)
- 📦 **Up-to-date dependencies** — all plugins and peer deps are regularly updated

## 📦 Installation

```bash
npm install --save-dev eslint@^10 @zh2s/eslint-config-fsd@^2
```

Version 2 requires ESLint 10 and Node.js 20.19+ on the 20.x line, 22.13+ on the 22.x line, or 24 and newer.

## 🛠️ Usage

### Full configuration

```js
import fsdEslintConfig from '@zh2s/eslint-config-fsd';

export default [
  ...fsdEslintConfig.flatConfig,
  // Add your project-specific overrides here if needed
];
```

### Compose your own config

```js
import fsdEslintConfig from '@zh2s/eslint-config-fsd';

export default [
  // your eslint configuration
  {
    plugins: fsdEslintConfig.plugins,
    settings: fsdEslintConfig.settings,
    rules: {
      // Include the rule groups you need.
      ...fsdEslintConfig.rules.publicApi,
      ...fsdEslintConfig.rules.layersSlices,
      ...fsdEslintConfig.rules.importOrder,
    },
  },
];
```

For TypeScript files, configure a TypeScript parser and include the relevant file patterns in your ESLint config.

### Migrating from 1.x

Update rule overrides and `eslint-disable` comments to use the new rule names.

| Version 1 | Version 2 |
| --- | --- |
| `import/order` | `import-x/order` |
| `import/no-internal-modules` | `import-x/no-internal-modules` |
| `boundaries/element-types` | `boundaries/dependencies` |

The full preset uses the `eslint-plugin-import-x` recommended rules, which use the `import-x/` prefix. When composing a config, use the exported `plugins` and `settings` as shown above.

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

## Development

Use Node.js 26.13.1 to build the package. `npm pack` runs the build and produces the release archive.

```bash
nvm use
npm ci
npm pack
```
