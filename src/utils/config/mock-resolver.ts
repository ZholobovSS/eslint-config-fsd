/* Used by import/boundaries plugin for configure parser version */
export const interfaceVersion = 2;

export function resolve(source: string, file: unknown, settings: { extension: string }) {
    return { found: true, path: `${source}/index.${settings.extension}` };
}
