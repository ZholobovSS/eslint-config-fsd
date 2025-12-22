import { Linter } from 'eslint';
import path from 'path';

const mockImports = (config: Linter.Config, extension = 'js') => {
    return {
        ...config,
        settings: {
            ...config.settings,
            'import/resolver': {
                [path.resolve(__dirname, './mock-resolver.js')]: {
                    extension,
                },
            },
        },
    };
};

function setParser(config: Linter.Config, version = '2015') {
    return {
        ...config,
        parserOptions: {
            ecmaVersion: version,
            sourceType: 'module',
        },
    };
}

function setTSParser(config: Linter.Config) {
    return {
        ...config,
        parser: '@typescript-eslint/parser',
    };
}

export const configLab = {
    mockImports,
    setParser,
    setTSParser,
};
