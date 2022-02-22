import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import multiInput from 'rollup-plugin-multi-input';
import del from 'rollup-plugin-delete'
import path from 'path';

export default {
	input: ['./src/index.js', './src/io/index.js'],
	external: ['lodash'],
	output: [
		{
			dir: 'dist',
			format: 'es',
			//sourcemap: true,
			plugins: [terser()],
			chunkFileNames: (chunkInfo) => {
				console.log(chunkInfo.name)
				return 'pack.[hash].js';
			}
		}
	],
	plugins: [
		babel({ babelHelpers: 'bundled' }),
		del({ targets: 'dist/*' }),
		multiInput({
			relative: 'src/',
			transformOutputPath: (output, input) => {
				console.log(output, input);
				return output;
			},
		})
	]
}