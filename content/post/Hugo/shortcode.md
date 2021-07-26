---
title: "ShortcodeでAmazonのリンクを作成する"
date: 2021-07-25T09:16:54+09:00
linkTitle: "Shortcode"
description: "Shortcode"
---

## はじめに
Hugoでブログを書いていて、頻出するようなHTMLを自動で簡単に出力できるようにしたいと思いました。  
そこで使用できるのが`Shortcode`の機能です。  
今回はAmazonのアフィリエイトリンクを作成するためのShortcodeを作成します。  

## Shortcodeの基本
Shortcodeは、`事前に定義した小さな処理を呼び出すための仕組み`です。  
ここでは書き方を整理します。 

- /layouts/shortcodes/以下に`SHORTCODE`.htmlをファイルを作成すると  
  `SHORTCODE`がショートコード名になる
- Shortcodeを呼び出す場合は  
  `{{</* ショートコード名 "値" */>}}`  
  `{{</* ショートコード名 パラメータ名="値" */>}}`
- パラメータを取り出す場合は  
  `{{ .Get 0 }}`（0はパラメータのインデックス）  
  `{{ .Get パラメータ名 }}`
- 間に文字を挟み込める  
  `{{</* highlight go >}} A bunch of code here {{< /highlight */>}}`
- 挟み込んだ文字を取り出す場合は  
  `{{ .Inner }}`
- 挟み込んだ文字は書き方によって処理のされ方が異なる  
  `{{</* */>}}` -> HTML  
  `{{%/* */%}}` -> Markdown
- Built-inショートコードが存在する。
  - Figure
  - Youtube
  - Tweet
  - Instagram
  - etc.
- ShortcodeのサンプルをMarkdownで表示したい場合は  
  `{{</*/* shortcode */*/>}}`

## Amazonのショートコードを作成
サンプルにAmazonのアフィリエイトリンク用のショートコードを作成します。  
`/layouts/shortcodes/amazon.html`というファイルを作成しました。  

中身は
```
{{- $tag := .Site.Params.amazonTrackingId }}
{{- $asin := .Get "asin" -}}
{{- $title := .Get "title" -}}
<div class="amazon">
  <a target="_blank" href="https://www.amazon.co.jp/dp/{{ $asin }}/ref=nosim?tag={{ $tag }}">
    <img class="amazon-img" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=JP&ASIN={{ $asin }}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL350_&tag={{ $tag }}" />
    <p class="amazon-title">{{ $title }}</p>
  </a>
</div>
```

Amazonのリンクに関しては[Amazon.co.jpの特定の商品へのシンプルなテキストリンクはどのように作ればよいですか。](https://affiliate.amazon.co.jp/help/node/topic/GP38PJ6EUR6PFBEC)を参考にしています。  


呼び出し方は  
`{{</* amazon asin="123456789" title="商品名" */>}}`  

config.tomlに以下のように自身のトラッキングIDを設定してください。  
```
[Params]
  amazonTrackingId = "あなたのトラッキングID"
```

## Amazonの商品ページからShortcode作成
補足として、Amazonの商品ページからShortcodeを自動生成する方法を記載しておきます。  
以下をBookmarkletとして登録しておきます。  
```
javascript:(function(){var asin=document.URL.match(/\/dp\/(.{10})/)[1], title=document.getElementById("productTitle").textContent.trim(); alert(`{{</* amazon asin="${asin}" title="${title}" */>}}`);})();
```

## 参考
- [Shortcodes](https://gohugo.io/content-management/shortcodes/)