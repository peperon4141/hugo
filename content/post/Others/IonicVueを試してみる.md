---
title: "Ionic vueを試してみる"
date: 2021-08-26T23:00:42+09:00
linkTitle: "Ionic vueを試してみる"
description: "Ionic vueを試してみる"
---

## はじめに
Ionicとは、ハイブリッドアプリを作成するフレームワークです。  
Ionicは元々Angularというフレームワークに依存していましたが、Vue.jsが使えるようになったので、実際に試してみようと思います。

## アプリを作る
### IonicのCLIをインストール
```
yarn global add @ionic/cli@latest
```
- `global`: local内でどこからでも参照できるようにします

Ionic CLIの6.17.0がインストールされました。  

以下のようなコマンドがあります。
```
completion ...................... (experimental) Enables tab-completion for Ionic CLI commands.
config <subcommand> ............. Manage CLI and project config values (subcommands: get, set, unset)
deploy <subcommand> ............. (paid) Appflow Deploy functionality (subcommands: manifest)
docs ............................ Open the Ionic documentation website
info ............................ Print project, system, and environment information
init ............................ (beta) Initialize existing projects with Ionic
login ........................... Log in to Ionic
logout .......................... Log out of Ionic
signup .......................... Create an Ionic account
ssh <subcommand> ................ Commands for configuring SSH keys (subcommands: add, delete, generate, list, setup, use)
start ........................... Create a new project
```

### アプリを作成
```
ionic start <name> <template> [options]
```
- `name`: The name of your new project (e.g. myApp, "My App")
- `template`: The starter template to use (e.g. blank, tabs; use --list to see all)
- `--type=<type>`: Type of project to start (e.g. vue, angular, react, ionic-angular, ionic1)
- 

今回は、blankテーマで、vueタイプのアプリを作成します。  
```
ionic start FirstApp blank --type=vue 
```

以下のような構成が作られました。  
```
/first-app
├── /public
├── /src
├── /tests
├── /node_modules
├── Makefile
├── babel.config.js
├── cypress.json
├── ionic.config.json
├── ionic.starter.json
├── jest.config.js
├── package-lock.json
├── package.json
└── tsconfig.json
```

### アプリを起動する
```
cd first-app
ionic serve
```
しばらくするとアプリのコンパイルが終わりサーバーが立ち上げられます。  
以下にアクセスするとアプリが確認できます。  
http://localhost:8100/

### アプリを少し変更する
`first-app/src/views/Home.vue` ディレクトリのファイルを少し変更すると、自動で再コンパイルされホットリロードされます。  

## さいごに
今回は簡単なアプリだけを作成しました。  
普段使い慣れたVue.jsをアプリで使用することで、アプリ作成のハードルがぐっと下がった気がします。  
なにかアプリを出せたらいいなと思いました。  