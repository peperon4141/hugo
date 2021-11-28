---
title: "Webpack5勘所"
date: 2021-11-28T16:16:28+09:00
linkTitle: "Webpack5勘所"
description: "Webpack5勘所"
---

## はじめに
Webpack5が[2020/10/10にリリース](https://webpack.js.org/blog/2020-10-10-webpack-5-release/)された。  
Webpackは中規模以上のweb軽開発ではデファクトスタンダードなんじゃないだろうか。  
自分が関わっているほとんどすべてのフロントエンドではWebpackが使用されている。  
慣れるまでは難しいが、学んだ内容を備忘録的にこのページにまとめる。

## 基本概念
Webpackとは基本的にはJavaScriptアプリケーション用の静的モジュールバンドラーです。  
つまり、基準となるJSファイルを指定することで、それに紐づく依存関係モジュールを1つのファイルに結合してくれます。  
これを理解するために基本コンセプトは以下です。  
| 概念 | 意味 |
| -- | -- |
| entry | 依存関係の起点となるファイル。デフォルトで./src/index.js |
| output | 出力パスやファイル名。 |
| loaders | JSとJSONファイルだけ理解するWebpackに、変換可能なモジュールを追加します。<br>主に`test`(対象ファイルの識別)と`use`(どのローダーを使用するか)の2つのプロパティを使って設定します。 |
| plugins | requireしてpluginsに追加することで、機能を追加できます。 |
| mode | developmentやproductionまたは独自の環境の最適化に使用できます。 |

## entry / output
[https://webpack.js.org/concepts/entry-points/](Entry Points)
[https://webpack.js.org/concepts/output/](Output)  

最も単純な例は以下のような設定です。  

```
module.exports = {
  entry: './src/file.js',
  output: {
    filename: 'bundle.js',
  },
};
```

より複雑な設定では、複数ページのアプリケーション用にマルチエントリの設定や、ouputのファイル名やパス名を動的に変更することも可能です。

## Loaders
[https://webpack.js.org/concepts/loaders/](Loaders)  

例として、以下のようにローダーを追加します。  
```
npm install --save-dev css-loader ts-loader
```

``` webpack.config.js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
};
```

この例だと、.cssファイルに対してcss-loaderを.tsファイルに対してts-laoderを適用します。  

以下の例のように、.cssに対して複数のLoaderを適用することも可能です。  
この場合は、下から順にLoaderが適用されます。  
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
```
ちなみに、css-loaderはCSSをJS用に変換するLoader、style-loaderはCSSをJSに挿入するLoaderです。  

## Plugins
[https://webpack.js.org/concepts/plugins/](Plugins)  

Pluginsは主にLoaderではできないことを実行するために使用されます。  

例えば、`HtmlWebpackPlugin`は以下のように使用できます。  
```
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
```
多くのプラグインはオプションを定義できます。  

[https://webpack.js.org/plugins/](Plugins)からほしいPluginを探せます。  

個人的には[https://webpack.js.org/plugins/html-webpack-plugin/](HtmlWebpackPlugin)は頻出です。  
自動で依存関係のJSをHTMLに挿入してくれるので、漏れが無く便利です。  

