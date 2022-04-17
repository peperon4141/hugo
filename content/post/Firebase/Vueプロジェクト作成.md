---
title: "Vueプロジェクト作成"
date: 2022-04-16T17:36:40+09:00
linkTitle: "Vueプロジェクト作成"
description: "Vueプロジェクト作成"
---

## プロジェクト作成を楽したい
プロジェクトを新規作成する場合に、ゼロから作成するよりも雛形を使いたい。  
使用したいモジュールは以下。
- Vue.js
- Webpack
- Firebase
- Sass
- TypeScript


## vue create
コマンド：`vue create`  
自分で選択肢を選ぶながらプロジェクトを作成できる。  
最大の問題点は、webpackの設定ファイルがVue用に作成されたもので作られてしまう。  
気に食わない。

## vue init
コマンド：`vue init webpack-simple project-name`  
指定したテンプレートを元にプロジェクトを作成できる。  
問題点は、パッケージのバージョンが古すぎる。  
ローカルのNode.jsのバージョンとマッチしないと、作成直後でもエラーが発生して動作しない。  
このコマンドはもう使えないと思って良いかもしれない。  

## webpack-cli
コマンド：`webpack init`  
webpackのプロジェクトを作成することができる。
問題点は、Vue.jsの設定は自分でしないといけないこと。

## 結論
`webpack-cli` を使用するのが一番良さそう。

```sh
$ mkdir project-name
$ cd project-name
$ yarn init -y
$ yarn add webpack webpack-cli
$ npx webpack init
```

更に、これでプロジェクトを作成した後に、 `firebase init` (firebase-toolsが必要)でfirebaseプロジェクトの設定を追加するのが良さそう。

Vue.jsを追加する場合は、以下の記事が参考になりました。  
https://ics.media/entry/16329/#webpack-ts-vue

## Vue の追加
```sh
yarn add -D vue vue-loader @vue/compiler-sfc
```

webpack.config.jsonに以下を追加  
```
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
```
  
webpack.config.jsonの`plugins`に以下を追加。  
```
plugins: [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  }),
  ...
],
```

webpack.config.jsonの`module.rules`に以下を追加。  
```
module: {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    ...
  ]
}
```

`index.js`に追加。  
```
import { createApp } from 'vue';
import Hello from './hello.vue';

document.addEventListener('DOMContentLoaded', () => {
  createApp(Hello).mount('#app');
});
```