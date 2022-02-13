import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import multiInput from 'rollup-plugin-multi-input';
import path from 'path';

export default {
	input:  ['./src/index.js', './src/io/index.js'],
	external: ['lodash'],
	output: [  {
			dir: 'dist',
			format: 'es',
			plugins: [terser()]
		},],
	plugins: [
		babel({ babelHelpers: 'bundled' }),
		multiInput({ 
			relative: 'src/'
		})
	]
}