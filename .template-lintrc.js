/* eslint-env node */
"use strict";

module.exports = {
  extends: "recommended",

  ignore: ["dummy/**"],

  rules: {
    "no-bare-strings": true,
    quotes: "double",
    "attribute-indentation": { "open-invocation-max-len": 100 },
    "no-partial": false,
    "no-positive-tabindex": false,
    "block-indentation": true,
    "self-closing-void-elements": false,
    "no-inline-styles": false,
    "style-concatenation": false
  }
};
