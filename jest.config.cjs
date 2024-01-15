
const esModules = ['@mui/material'].join('|')

// eslint-disable-next-line no-undef
module.exports = {
    verbose: true,
    testEnvironment: "jsdom",
    preset: 'ts-jest/presets/js-with-babel',
    roots: ['src'],
    transform: {
        '^.+\\.(tsx|js|ts)$': 'babel-jest'
    },
    transformIgnorePatterns: [
        `<rootDir>/node_modules/(?!(${esModules}))`
    ],
};