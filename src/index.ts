import { publicApi } from './rules/public-api/index.js';
import { layersSlices } from './rules/layers-slices/index.js';
import { importOrder } from './rules/import-order/index.js';
import type { ESLint, Linter } from 'eslint';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importPlugin from 'eslint-plugin-import-x';
import { defineConfig, globalIgnores } from 'eslint/config';
import boundaries from 'eslint-plugin-boundaries';
import { layersLib } from './utils/layers.js';

interface FsdConfig {
    readonly flatConfig: Linter.Config[];
    readonly rules: Record<'publicApi' | 'layersSlices' | 'importOrder', Linter.Config['rules']>;
    readonly settings: NonNullable<Linter.Config['settings']>;
    readonly plugins: NonNullable<Linter.Config['plugins']>;
}

const settings: FsdConfig['settings'] = {
    'boundaries/elements': [...layersLib.getLayersBoundariesElements(), ...layersLib.getGodModeElements()],
    'boundaries/dependency-nodes': ['import'],
    'import/resolver': {
        typescript: true,
    },
    'import-x/resolver-next': [createTypeScriptImportResolver()],
};

const plugins: FsdConfig['plugins'] = {
    ...importPlugin.flatConfigs.recommended.plugins,
    boundaries: boundaries as unknown as ESLint.Plugin,
};

const rules: FsdConfig['rules'] = {
    publicApi,
    layersSlices,
    importOrder,
};

const flatConfig: Linter.Config[] = defineConfig([
    globalIgnores(['eslint.config.js']),
    importPlugin.flatConfigs.recommended,
    {
        plugins,
        settings,
        rules: {
            ...rules.importOrder,
            ...rules.layersSlices,
            ...rules.publicApi,
        },
    },
]);

const config: FsdConfig = {
    flatConfig,
    rules,
    settings,
    plugins,
};

export default config;
