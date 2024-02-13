const { pathsToModuleNameMapper } = require('ts-jest')

const { compilerOptions } = require('./tsconfig.json')

const esModules = ['@mui/material'].join('|')

// eslint-disable-next-line no-undef
module.exports = {
    verbose: true,
    testEnvironment: "jest-environment-jsdom",
    preset: 'ts-jest/presets/js-with-babel',
    roots: ['src'],
    transform: {
        '^.+\\.(tsx|js|ts)$': 'ts-jest'
    },
    transformIgnorePatterns: [
        `<rootDir>/node_modules/(?!(${esModules}))`
    ],
    moduleDirectories: ['<rootDir>', 'node_modules', 'src'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths),
    },
};
