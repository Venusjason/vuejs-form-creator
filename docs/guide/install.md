<!-- ## 安装 -->

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用

``` js
npm i q-former --save
```

### vue-cli 3.0  引入jsx写法编译
*vue 版本要求 > 2.6.0*

``` js
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props -D
```

>修改 babel.config.js 或 .babelrc

``` js
module.exports = {
    presets: [
       ['@vue/app', {
           useBuiltIns: 'entry'
       }],
        ['@vue/babel-preset-jsx',
        {
            "injectH": false
        }]
    ]
}
```
*注意：@vue/babel-preset-jsx默认会注入一个h语法糖，会与vue本身冲突，这个配置要设置false，否则项目启动会报错*