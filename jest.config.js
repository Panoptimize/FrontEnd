module.exports = {

    preset: 'ts-jest',
    testEnvironment: 'jsdom', 
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['js','jsx', 'ts', 'tsx'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', './jest.setup.js'], 

};

