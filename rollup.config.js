import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify'
import { minify } from 'uglify-es';

export default {
  //目录
  input: 'src/formCreator/index.js',
  plugins: [
    resolve(),
    babel({
        exclude: 'node_modules/**' // 只转译我们的源代码
    }),
    // uglify({}, minify),
  ],
  //你想将其格式化成什么格式
  output: {
    format: 'umd',
    file: 'lib/index.js',
    name: 'formCreator',
    minify: true,
  },
}