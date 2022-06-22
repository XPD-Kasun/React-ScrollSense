import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import multiInput from 'rollup-plugin-multi-input';
import del from 'rollup-plugin-delete';
import typescript from '@rollup/plugin-typescript';
import path from 'path';

export default {
	input: ['./src/index.ts', './src/io/index.ts', './src/helpers/index.ts'],
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
		del({ targets: 'dist/*' }),
		multiInput({
			relative: 'src/',
			transformOutputPath: (output, input) => {
				console.log(output, input);
				return output;
			},
		}),
		typescript(),
	]
}