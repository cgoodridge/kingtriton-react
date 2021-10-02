module.exports = {
  "root": true,
  "env": {
    "es6": true,
    "node": true,
  },
  "parser": "babel-eslint",

  "extends": [
    "eslint:recommended",
    "google",
  ],
  "rules": {
    "max-len": ["error", {"code": 180}],
    "quotes": ["error", "double"],
    "indent": "off",
  },
};
