---
title: "爆速でexpressのwebアプリ作成"
date: 2021-08-22T10:07:25+09:00
linkTitle: "爆速でexpressのwebアプリ作成"
description: "爆速でexpressのwebアプリ作成"
---

## はじめに
簡単なUIを持ったアプリをwebページが作成したかったので、expressでサクッと作ります。  
nodeはインストール済み前提です。

```
$ node -v
v15.4.0
```

## 作り方
`express-generator`を使うことで、雛形を爆速で作成できます。

### 1. ディレクトリ作成
```
$ mkdir my-site
$ cd my-site
```

### 2. generatorを追加
```
$ yarn init
$ yarn add -D express-generator
$ yarn install
```

### 3. 雛形を作成
今回はあえてcurrent directoryに作成します。  

```
$ npx express -v pug -c sass --git -f ./ 
```
npxでnpmでインストールしたモジュールを使用できます。

- `-v`: add view <engine> support (dust|ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
- `-c`: add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
- `--git`: add .gitignore
- `-f`: force on non-empty directory

作成後は以下のような構成になっており、package.jsonは上書きされています。  
```
.
├── app.js
├── bin
├── node_modules
├── package.json
├── public
├── routes
└── views
```

### 4. 起動する
```
$ yarn install
```
npmモジュールをインストールします。  
少し時間がかかります。

```
$ yarn start
```
expressを起動します。  

http://localhost:3000/ にアクセスすると、サイトが表示されます。

## さいごに
スムーズに行けば10分足らずでサイトの雛形が作成できます。  
