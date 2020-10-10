module.exports = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    moduleDirectories: [ 'node_modules', 'src' ],
    setupFiles: [ './test/globals.ts' ],
    verbose: true,
    moduleNameMapper: {
        '\\.(s?css)$': 'identity-obj-proxy',
    },
};
