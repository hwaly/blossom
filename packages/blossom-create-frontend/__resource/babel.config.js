const isBabelRegister = caller => !!(caller && caller.name === "@babel/register");

module.exports = (api) => {
    const isRegister = api.caller(isBabelRegister);

    if (isRegister) {
        return {
            "presets": [
                [
                    "@babel/preset-env"
                ]
            ]
        }
    }

    return {
        "presets": [
            [
                "@babel/preset-env",
                {
                    "useBuiltIns": "entry",
                    "modules": false,
                    "forceAllTransforms": true
                }
            ]
        ]
    };
};