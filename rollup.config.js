import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

import pkg from './package.json';

export default [
	{
		plugins: [
			resolve({ preferBuiltins: true }),
			commonjs({ namedExports: { 'svelte/compiler': ['parse'] } }),
			json(),
		],
		input: 'src/index.js',
		external: ['svelte/compiler'],
		output: [
			{ file: pkg.module, format: 'es', sourcemap: false },
			{ file: pkg.main, format: 'cjs', sourcemap: false },
		],
	},
	{
		plugins: [
			resolve({ browser: true }),
			commonjs({ namedExports: { 'svelte/compiler': ['parse'] } }),
			json(),
			globals(),
			builtins(),
		],
		input: 'src/index.js',
		output: [
			{
				file: 'dist/mdsvex.js',
				name: 'mdsvex',
				format: 'umd',
				sourcemap: false,
			},
		],
	},
];
