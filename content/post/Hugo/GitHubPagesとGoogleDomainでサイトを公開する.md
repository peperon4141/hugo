---
title: "GitHubPagesとGoogleDomainでサイトを公開する"
date: 2021-07-25T09:32:14+09:00
---

## はじめに
GitHubPagesの利点は、いくつか制限があるものの以下のメリットがあります。  
- TLS対応（Let's Encrypt)
- 独自ドメイン対応
- 無料

GoogleDomainでは１４００円のドメインを使用しています。  
このドメインにサブドメインを追加することで、複数ドメインを追加料金なく使用しています。  

なので、私はいくつかブログを運用していますが、年間合計１４００円しかかかっていません。  
しかも、GitHubのActionsなど優秀な機能の恩恵を請けられるので、メンテナンスコストが非常に少なくなります。  

## GoogleDomainでドメイン取得
サブドメインを追加する方法を説明します。  
GoogleDomainの管理画面から `マイドメイン` > 自分のドメイン > `DNS` > `カスタムレコードを管理`  

すると、ドメインの設定をカスタマイズできるようになります。  
`新しいレコードを追加` し、以下のように入力します。  
- ホスト名： サブドメインにしたい文字列（別名とするサブドメインの指定）
- タイプ： CNAME（データで指定したホストに対して、別名を登録する方式）
- TTL：3600（1時間の有効期限）
- データ：XXXXXXX.github.io. （自身のGitHubのホスト）

## GitHubActionsを使ってHugoをビルドする
ActionsのWorkflowに以下を登録します。  
```
name: gh-pages

on:
  push:
    branches:
      - master
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-20.04

    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          submodules: true
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.85.0'
          extended: true
      - name: Hugo build
        run: hugo --minify
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```
このWorkflowの概要としては、
- masterブランチが変更された場合に動作する
- サブモジュールがあれば読み込む
- Hugoの0.85.0を拡張付きでインストールする（SASSなどを使用する場合は拡張が必要）
- publicディレクトリを公開する

ビルド実行前に`/static/CNAME`内に、GoogleDomainで指定したDomainを記載します。  
そうすることで、GitHubPagesの独自ドメインに反映されます。
{ .info }

## GitHubPagesの設定
以下の設定は反映に時間がかかる場合があるので、動作しなければしばらく待ってみましょう。  

### Sourceの設定
GitHubActionsのビルドが完了すると、`gh-pages`というブランチにHugoのビルド結果が作られているはずです。  
`Settings` > `Pages`で`source`に`gh-pages`を選択し、rootを選びましょう。  

### Custom domain
`/static/CNAME`が適切に設定されていると、`Custom domain`は勝手に設定されているはずです。  
GitHubPagesから`Custom domain`を設定した場合、自動でCNAMEが設定されます。  
ただし、このファイルはHugoをビルドしたブランチには反映されないため、`static`ディレクトリ以下に配置する必要があります。  

### Enforce HTTPS
チェックを付けるとHTTPSで公開してくれます。  