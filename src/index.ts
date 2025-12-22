import { publicApi } from './rules/public-api/index.js';
import { layersSlices } from './rules/layers-slices/index.js';
import { importOrder } from './rules/import-order/index.js';
import { ESLint, Linter } from 'eslint';
import importPlugin from 'eslint-plugin-import';
import { defineConfig, globalIgnores } from 'eslint/config';
import boundaries from 'eslint-plugin-boundaries';
import { layersLib } from './utils/layers.js';

const boundariesPlugin = boundaries as unknown as ESLint.Plugin;

const settings: Linter.Config['settings'] = {
    'boundaries/elements': [...layersLib.getLayersBoundariesElements(), ...layersLib.getGodModeElements()],
    'import/resolver': {
        typescript: true,
    },
};

const plugins: Linter.Config['plugins'] = { boundaries: boundariesPlugin };

const rules: Record<'publicApi' | 'layersSlices' | 'importOrder', Linter.Config['rules']> = {
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

export default {
    flatConfig,
    rules,
    settings,
    plugins,
} as const;
