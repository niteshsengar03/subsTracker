// import globals from "globals";
// import pluginJs from "@eslint/js";


// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {languageOptions: { globals: globals.node }},
//   pluginJs.configs.recommended,
// ];

import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.node },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'semi': ['error', 'always'],  // Enforce semicolons
      'semi-spacing': ['error', { 'before': false, 'after': true }],  // Space after semicolon
    }
  }
];