export default {
    clearMocks: true,
    coverageDirectory: "./coverage",
    testEnvironment: "node",
    transform: {
        "^.+\\.js$": "babel-jest",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!supertest).+\\.js$", // Ignorar transformación de archivos de node_modules
    ],
};
  