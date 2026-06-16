// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    // Reanimated's documented API mutates `sharedValue.value` from event
    // handlers and worklets; the React-Compiler immutability rule flags this
    // as a false positive, so we disable it for our Reanimated-driven UI.
    rules: {
      "react-hooks/immutability": "off",
    },
  },
]);
