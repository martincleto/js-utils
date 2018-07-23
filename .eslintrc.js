module.exports = {
    "env": {
        "amd": true,
        "browser": true,
        "es6": true,
        "jasmine": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [

            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
