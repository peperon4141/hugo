---
title: "WordPressのファイル構成を理解する"
date: 2021-07-29T19:07:24+09:00
linkTitle: "WordPressのファイル構成を理解する"
description: "WordPressのファイル構成を理解する"
---

## はじめに
前回の[Dockerを使ってwordpress環境を瞬作](../dockerを使ってwordpress環境を瞬作/)という投稿で、WordPressを立ち上げました。  
今回はファイル構成の詳細を見ていきましょう。  

## ファイル構成
```
.
├── wp-admin # 管理画面に関するファイル
├── wp-content
│   ├── languages
│   ├── plugins # プラグインが格納されるディレクトリ
│   ├── themes # テーマが格納されるディレクトリ
│   └── upgrade
└── wp-includes
    ├── index.php # WordPressが初めに通るファイル
    ├── wp-config.php # WordPressの設定が書かれているファイル
    ├── wp-config-sample.php # wp-config.phpの雛形ファイル
    ├── wp-login.php # ログイン画面のファイル
    ├── license.txt # ライセンスに関するファイル
    ├── readme.html # WordPressの概要に関するファイル
    └── .htaccess # Apacheの設定ファイル
```
