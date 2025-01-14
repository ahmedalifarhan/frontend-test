module.exports = {
  preset: "react-native",
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|@react-native-community|react-redux|@testing-library))",
  ],
  setupFiles: [
    "@react-native-async-storage/async-storage/jest/async-storage-mock",
  ],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
};
