import { Linter } from 'eslint';
import { layersLib } from '../../utils/layers.js';

const getNotSharedLayersRules = () =>
    layersLib.getUpperLayers(layersLib.FS_LAYERS_NAME.shared).map((layer) => ({
        from: layer,
        allow: layersLib.getLowerLayers(layer),
    }));

const sharedLayerRule = {
    from: layersLib.FS_LAYERS_NAME.shared,
    allow: layersLib.FS_LAYERS_NAME.shared,
};

const getGodModeRules = () =>
    layersLib.FS_LAYERS_LIST.map((layer) => ({
        from: `gm_${layer}`,
        allow: [layer, ...layersLib.getLowerLayers(layer)],
    }));

export const layersSlices: Linter.Config['rules'] = {
    'boundaries/element-types': [
        2,
        {
            default: 'disallow',
            message:
                '"${file.type}" is not allowed to import "${dependency.type}" | See rules: https://feature-sliced.design/docs/reference/layers/overview ',
            rules: [...getNotSharedLayersRules(), sharedLayerRule, ...getGodModeRules()],
        },
    ],
};
