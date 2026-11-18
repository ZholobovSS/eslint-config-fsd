import type { Linter } from 'eslint';
import { layersLib } from '../../utils/layers.js';

export const importOrder: Linter.Config['rules'] = {
    'import-x/order': [
        2,
        {
            alphabetize: {
                order: 'asc',
                caseInsensitive: true,
            },
            pathGroups: layersLib.FS_LAYERS_LIST.map((layer) => ({
                pattern: `**/?(*)${layer}{,/**}`,
                group: 'internal',
                position: 'after',
            })),
            pathGroupsExcludedImportTypes: ['builtin'],
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        },
    ],
};
