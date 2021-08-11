---
title: "viewportを理解する"
date: 2021-08-10T21:44:00+09:00
linkTitle: "viewportを理解する"
description: "viewportを理解する"
---

## はじめに
HTMLのviewportの理解が曖昧で、コピペでやり過ごしていました。  
viewportは例えば以下のようなものです。  
```
<meta name="viewport" content="width=device-width,initial-scale=1">
```
この記事では、viewportの意味を解き明かして行きたいと思います。

## まずは基本
- `viewport`は表示領域のこと
- `<meta name="viewport" content="width=480">` とすると、幅480pxとして仮想的なモニターができるイメージ
- `document.documentElement.clientWidth` も480pxになるように計算される
- mediaクエリも480pxとして判定される
- ブラウザはこの仮想的なモニターをブラウザサイズに幅が合うように表示する
- `<meta name="viewport" content="width=device-width">` と指定した場合はブラウザの幅が使用される
- 解像度は考慮されない

## 設定できる値の説明
### width
表示領域の幅を指定できる。  
`width=device-width`で実際のデバイスの幅と一致させられる。  

### initial-scale
初期のズーム倍率。  
`minimum-scale`～`maximum-scale`を指定することで、ズーム範囲を指定できる。  
- `minimum-scale`: 0～10 の範囲、初期値は 0.25
- `maximum-scale`: 0～10 の範囲、初期値は 1.6

### user-scalable
- ズームの操作を許可するか、しないかを指定する。  

## 注意したいところ
- モバイル端末で有効。ブラウザへの**アドバイス**として使用される
- 指定しないと「ウィンドウ幅によってページコンテンツが隠されない最小の横幅」か「デフォルト値・980px」


## ではどうすべきか
全ブラウザで、統一した表示をしたければwidthを指定する。  
```
<meta name="viewport" content="width=360,initial-scale=1">
```

デバイスの画面サイズに応じてコンテンツの大きさを変えたい場合は、device-widthを指定する。  
```
<meta name="viewport" content="width=device-width,initial-scale=1">
```

## 参考
- [もう逃げない。HTMLのviewportをちゃんと理解する](https://qiita.com/ryounagaoka/items/045b2808a5ed43f96607)
- [HTML：viewport の正しい書き方](https://www-creators.com/archives/5972)

