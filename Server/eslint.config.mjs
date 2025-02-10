import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node, // ✅ Enables require, module.exports
        ...globals.es2021, // ✅ Enables modern JavaScript features
        ...globals.jest // ✅ Enables Jest globals (describe, it, expect, jest)
      }
    }
  },
  pluginJs.configs.recommended
];
