---
title: "FirebaseとVue.jsでアプリを作成する"
date: 2021-08-29T13:23:07+09:00
linkTitle: "FirebaseとVue.jsでアプリを作成する"
description: "FirebaseとVue.jsでアプリを作成する"
---

## はじめに
FirebaseでTODOアプリを作成します。  
TODOアプリで一通りのFirebaseの機能を使ってみたいと思います。  
今回はFirebaseの中で以下のサービスを利用します。  
- Authentication
- Cloud Firestore
- Hosting

Yarn, Vue.js、Vue CLIを使用します。  

Vue CLIは以下でグローバルにインストールしておいて下さい。  

```
yarn global add @vue/cli
```

firebaseのCLIは以下のコマンドでグローバルにインストールします。
```
yarn global add firebase-tools
```

## アプリ作成
以下のコマンドでプロジェクトを作成します。  
オプションはお好みで選びます。  
```
vue create {プロジェクト名}
```

プロジェクト作成後直後の状態で起動してみましょう！
```
cd {プロジェクト名}
yarn serve
```

[http://localhost:8080/](http://localhost:8080/)にアクセスすると初期状態のVueプロジェクトが確認できます。  


Vue用マテリアルデザインフレームワークとしてVuetifyを追加する。  
```
vue add vuetify
```
* 文法チェックをEslintにするのが好みです
* `Component name "Home" hould always be multi-word`のようなエラーが出たら`vue/multi-word-component-names': 0`を`.eslintrc.js`の`rules`に追加する。  

## Firebaseプロジェクトを作成する
[Firebase](https://firebase.google.com/)にアクセスし、ログインします。
`プロジェクトを追加`をクリックし、名前を設定して、プロジェクトを作成します。
今回は`このプロジェクトでGoogleアナリティクスを有効にする`をオフにしました。  

使用する機能を全て有効化しておきます。
- Authentication
- Hosting
- Cloud Firestore

Authenticationは、Googleプロバイダを有効化しておきます。  
Cloud Firestoreのロケーションはお好みですが、私は`asia-northeast1（東京）`にしました。  
参考: [リージョンとゾーン](https://cloud.google.com/compute/docs/regions-zones?hl=ja)


## Firebaseをアプリに統合する

### firebaseをアプリに追加
```
yarn add -D firebase
```

`src/firebase.ts`にfirebaseの設定を記入する。

```
import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "*****",
  authDomain: "*****",
  projectId: "*****",
  storageBucket: "*****",
  messagingSenderId: "*****",
  appId: "*****"
}

const isEmulating = window.location.hostname === 'localhost'

initializeApp(firebaseConfig)

if (isEmulating) {
  connectFirestoreEmulator(getFirestore(), 'localhost', 8080)
}
```

`src/main.ts`で`import './firebase'`のようにこのファイルを呼出し、firebaseの初期化を行います。  

### firebaseプロジェクトを初期化
firebaseのプロジェクトと、作成しているNodeプロジェクトを紐付ける。  
```
firebase init
```
* Emulatorはローカルで機能をエミュレートしてくれます
* Github workflowは、Githubリポジトリにマージすると、自動でFirebaseのHostingにデプロイしてくれます

### Deployしてみる
```
yarn build
firebase deploy
```

