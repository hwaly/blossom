// const presets = [
//     [
//         '@babel/preset-env',
//         {
//             'useBuiltIns': 'entry',
//             'modules': false,
//             'forceAllTransforms': true
//         }
//     ]
// ];

const presets = [
    [
        '@babel/preset-env',
        {
            modules: false,
            forceAllTransforms: true
        }
    ]
];

const plugins = [
    '@babel/plugin-proposal-object-rest-spread',
    [
        '@babel/plugin-transform-runtime',
        {
            helpers: false
        }
    ]
];

module.exports = {
    presets,
    plugins
};