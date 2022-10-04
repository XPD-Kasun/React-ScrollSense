import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import fs from 'fs';
import multiInput from 'rollup-plugin-multi-input';
import del from 'rollup-plugin-delete';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import path from 'path';

function mergePlugin(options) {
	return {
		name: 'merge-rollup-plugin',
		writeBundle() {
			
			if(!options || !options.target) {
				throw new Error('No target given. Abort');
			}
			else{ 
				if(fs.existsSync(options.target)) {
					fs.rmSync(options.target);
				}
			}
			if (options.files) {

				for (let i = 0; i < options.files.length; i++) {
					let file = fs.readFileSync(options.files[i]);					
					fs.appendFileSync(options.target, file);
					fs.appendFileSync(options.target, '\n');
				}
			}
		}
	}
}

export default {
	input: ['./src/index.ts', './src/io/index.ts', './src/helpers/index.ts'],
	external: ['lodash'],
	output: [
		{
			dir: 'dist',
			format: 'cjs',
			sourcemap: true,
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
		typescript()
	]
}