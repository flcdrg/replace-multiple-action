// See: https://rollupjs.org/introduction/

import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import license from 'rollup-plugin-license';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  input: 'src/main.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    typescript({
      compilerOptions: { module: 'ESNext', moduleResolution: 'Bundler' }
    }),
    nodeResolve({ preferBuiltins: true }),
    commonjs(),
    license({
      sourcemap: true,
      cwd: process.cwd(), // The default

      banner: {
        commentStyle: 'regular', // The default

        content: {
          file: path.join(__dirname, 'LICENSE'),
          encoding: 'utf-8' // Default is utf-8
        }
      },

      thirdParty: {
        includePrivate: true, // Default is false.
        includeSelf: true, // Default is false.
        multipleVersions: true, // Default is false.
        output: {
          file: path.join(__dirname, 'dist', 'dependencies.txt'),
          encoding: 'utf-8' // Default is utf-8.
        }
      }
    })
  ]
};

export default config;
