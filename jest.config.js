module.exports = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    setupFiles: [ './test/globals.ts' ],
    verbose: true,
    moduleNameMapper: {
        '\\.(s?css)$': 'identity-obj-proxy',
        "@/(.*)$": "<rootDir>/src/$1",
    }
};
