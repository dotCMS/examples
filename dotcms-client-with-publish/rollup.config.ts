import type { InputOptions, OutputOptions, RollupOptions } from 'rollup';

import typescriptPlugin from '@rollup/plugin-typescript';
import terserPlugin from '@rollup/plugin-terser';
import dtsPlugin from 'rollup-plugin-dts';
import copy from 'rollup-plugin-copy';

// Our output path
const outputPath = 'dist/dotcms-client';

// Our common input options, all configs will use these plugins
const commonInputOptions: InputOptions = {
    input: 'src/index.ts', // The entry point of our SDK
    plugins: [
        typescriptPlugin({
            tsconfig: './tsconfig.json',
            declaration: false, // We'll generate declarations separately
            module: 'esnext', // Ensure TypeScript outputs modern JavaScript modules
            target: 'es2022' // Using modern JavaScript features
        }),
        // Copy the package.json to the dist folder
        copy({
            targets: [
                {
                    src: 'package.json',
                    dest: 'dist',
                    transform: (contents) => {
                        const json = JSON.parse(contents.toString());
                        json.type = 'module'; // Add type: module
                        return JSON.stringify(json, null, 2);
                    }
                }
            ]
        })
    ]
};

// Our common output options, all configs will use these options
const commonOutputOptions: OutputOptions = {
    sourcemap: true,
    preserveModules: false // This ensures everything is bundled into one file
};

const config: RollupOptions[] = [
    // Config for MJS output
    // Used for modern browsers and bundlers
    // import { DotCMSClient } from 'dotcms-client'
    {
        ...commonInputOptions,
        output: [
            {
                ...commonOutputOptions,
                file: `${outputPath}.mjs`,
                format: 'es'
            }
        ]
    },

    // Config for IIFE output
    // Used for older browsers and bundlers
    // <script src="dotcms-client.js"></script>
    // <script src="dotcms-client.min.js"></script>
    {
        ...commonInputOptions,
        output: [
            {
                ...commonOutputOptions,
                name: 'dotcmsClient',
                file: `${outputPath}.js`,
                format: 'iife'
            },
            {
                ...commonOutputOptions,
                name: 'dotcmsClient',
                file: `${outputPath}.min.js`,
                format: 'iife',
                plugins: [terserPlugin()] // This plugin will minify our code, removing whitespace and other characters
            }
        ]
    },

    // Config for CJS output
    // Used for older bundlers like Browserify
    // const DotCMSClient = require('dotcms-client')
    {
        ...commonInputOptions,
        output: [
            {
                ...commonOutputOptions,
                file: `${outputPath}.cjs`,
                format: 'cjs'
            }
        ]
    },

    // Config for TypeScript declaration output
    // Used for TypeScript projects
    // import { DotCMSClient } from 'dotcms-client'
    {
        input: 'src/index.ts',
        plugins: [dtsPlugin()],
        output: {
            file: `${outputPath}.d.ts`,
            format: 'es'
        }
    }
];

export default config;
