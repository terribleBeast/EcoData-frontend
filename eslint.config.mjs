import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    "auto-import/auto-import": [
      2,
      {
        rootPath: "./src",
        packages: {
          d3: "d3",
          bloodhound: "Bloodhound",
          moment: "moment",
          alkali: {
            hasExports: "module-path/to/alkali",
          },
          dgrid: {
            modulesIn: "./bower_components/dgrid",
          },
        },
      },
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended,
]);
