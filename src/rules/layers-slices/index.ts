import type { Linter } from 'eslint';
import { layersLib } from '../../utils/layers.js';

const allowLayers = (layers: string[]) => ({
    to: { element: { type: layers } },
});

const getNotSharedLayersRules = () =>
    layersLib.getUpperLayers(layersLib.FS_LAYERS_NAME.shared).map((layer) => ({
        from: { element: { type: layer } },
        allow: allowLayers(layersLib.getLowerLayers(layer)),
    }));

const sharedLayerRule = {
    from: { element: { type: layersLib.FS_LAYERS_NAME.shared } },
    allow: allowLayers([layersLib.FS_LAYERS_NAME.shared]),
};

const getGodModeRules = () =>
    layersLib.FS_LAYERS_LIST.map((layer) => ({
        from: { element: { type: `gm_${layer}` } },
        allow: allowLayers([layer, ...layersLib.getLowerLayers(layer)]),
    }));

export const layersSlices: Linter.Config['rules'] = {
    'boundaries/dependencies': [
        2,
        {
            default: 'disallow',
            message:
                '"{{ from.element.type }}" is not allowed to import "{{ to.element.type }}" | See rules: https://feature-sliced.design/docs/reference/layers/overview',
            policies: [...getNotSharedLayersRules(), sharedLayerRule, ...getGodModeRules()],
        },
    ],
};
