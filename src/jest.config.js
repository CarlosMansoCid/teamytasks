export default {
    testEnvironment: 'jsdom',
    testMatch: [
        '**/__tests__/**/*.test.js',
        '**/?(*.)+(spec|test|tests).[ts]s?(x)',
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};