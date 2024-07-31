import cypress from "eslint-plugin-cypress";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended", "plugin:cypress/recommended"), {
    plugins: {
        cypress,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...cypress.environments.globals.globals,
            ...globals.node,
        },

        parser: babelParser,
        ecmaVersion: 5,
        sourceType: "commonjs",

        parserOptions: {
            requireConfigFile: false,
            sourceType: "module",
            "babelOptions": {
                "presets": ["@babel/preset-react"]
             },
             "ecmaVersion": 2022
        },
    },

    ignores: ["frontend/*"],


    rules: {},
}];
