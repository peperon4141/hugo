---
title: "Hugoでテーマ作成する前に抑えて置きたいこと"
date: 2021-07-14T00:04:43+09:00
linkTitle: "Hugoでテーマ作成する前に抑えて置きたいこと"
description: "Hugoでテーマ作成する前に抑えて置きたいこと"
---

## はじめに
私はHugoでテーマを作成していますが、よく探さないと記載されていなかったり、あやふやなまま使っていた書き方がありました。  
そこでそれらをまとめてみました。

## Hugoのテンプレートのハイフンの有無
以下のように、`{{}}`内に`-`を書いていたり、いなかったりするテーマを見かけます。  
```
<div>
  {{- .Title -}}
</div>
```
この出力結果は以下です。
```
<div>Hello, World!</div>
```

```
<div>
  {{ .Title }}
</div>
```
このようにハイフンがない場合は以下のようになります。
```
<div>
  Hello, World!
</div>
```

なので、前後のwhitespaceが消えます。

[Whitespace](https://gohugo.io/templates/introduction/#whitespace)

## 参考
- [Introduction to Hugo Templating](https://gohugo.io/templates/introduction/)