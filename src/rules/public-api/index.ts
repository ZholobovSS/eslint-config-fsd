import type { Linter } from 'eslint';
import { layersLib } from '../../utils/layers.js';

const FS_SLICED_LAYERS_REG = layersLib.getUpperLayers(layersLib.FS_LAYERS_NAME.shared).join('|');
const FS_SEGMENTS_REG = [...layersLib.FS_SEGMENTS_LIST, ...layersLib.FS_SEGMENTS_LIST.map((seg) => `${seg}.*`)].join(
    '|',
);

export const publicApi: Linter.Config['rules'] = {
    'import-x/no-internal-modules': [
        'error',
        {
            allow: [
                /**
                 * Allow not segments import from slices
                 * @example
                 * 'entities/form/ui' // Fail
                 * 'entities/form' // Pass
                 */
                `**/*(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})`,

                /**
                 * Allow slices with structure grouping
                 * @example
                 * 'features/auth/form' // Pass
                 */
                `**/*(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

                /**
                 * Allow not segments import in shared segments
                 * @example
                 * 'shared/ui/button' // Pass
                 */
                `**/*${layersLib.FS_LAYERS_NAME.shared}/*(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

                /**
                 * Allow import from segments in shared
                 * @example
                 * 'shared/ui' // Pass
                 */
                `**/*${layersLib.FS_LAYERS_NAME.shared}/*(${FS_SEGMENTS_REG})`,

                /** allow global modules */
                `**/node_modules/**`,

                /**
                 * allow custom shared segments with _prefixs
                 */
                `**/*${layersLib.FS_LAYERS_NAME.shared}/_*`,
                `**/*${layersLib.FS_LAYERS_NAME.shared}/_*/*`,
            ],
        },
    ],
};
