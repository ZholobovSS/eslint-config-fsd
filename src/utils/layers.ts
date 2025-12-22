const FS_LAYERS_NAME = {
    app: '1-app',
    pages: '2-pages',
    widgets: '3-widgets',
    features: '4-features',
    entities: '5-entities',
    shared: '6-shared',
};

const FS_SEGMENTS_NAME = {
    ui: 'ui',
    model: 'model',
    lib: 'lib',
    api: 'api',
    config: 'config',
    assets: 'assets',
};

const FS_LAYERS_LIST = [
    FS_LAYERS_NAME.app,
    FS_LAYERS_NAME.pages,
    FS_LAYERS_NAME.widgets,
    FS_LAYERS_NAME.features,
    FS_LAYERS_NAME.entities,
    FS_LAYERS_NAME.shared,
];

const FS_SEGMENTS_LIST = [
    FS_SEGMENTS_NAME.ui,
    FS_SEGMENTS_NAME.model,
    FS_SEGMENTS_NAME.lib,
    FS_SEGMENTS_NAME.api,
    FS_SEGMENTS_NAME.config,
    FS_SEGMENTS_NAME.assets,
];

const getLowerLayers = (layer: string) => FS_LAYERS_LIST.slice(FS_LAYERS_LIST.indexOf(layer) + 1);
const getUpperLayers = (layer: string) => FS_LAYERS_LIST.slice(0, FS_LAYERS_LIST.indexOf(layer));

const getGodModeElements = () =>
    layersLib.FS_LAYERS_LIST.map((layer) => ({
        type: `gm_${layer}`,
        pattern: `${layer}/_*`,
        mode: 'folder',
        capture: ['slices'],
    }));

const getLayersBoundariesElements = () =>
    layersLib.FS_LAYERS_LIST.map((layer) => ({
        type: layer,
        pattern: `${layer}/!(_*){,/*}`,
        mode: 'folder',
        capture: ['slices'],
    }));

export const layersLib = {
    FS_LAYERS_NAME,
    FS_LAYERS_LIST,
    FS_SEGMENTS_NAME,
    FS_SEGMENTS_LIST,
    getLayersBoundariesElements,
    getGodModeElements,
    getLowerLayers,
    getUpperLayers,
};
