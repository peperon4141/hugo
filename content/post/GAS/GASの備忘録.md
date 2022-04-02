---
title: "GASの備忘録"
date: 2022-04-02T17:48:34+09:00
linkTitle: "GASの備忘録"
description: "GASの備忘録"
---

## はじめに
GASを使用するにあたって、結構細かい仕様が気になることがあります。  
誰も気にしないような仕様を、備忘録として追記していきます。

## 備忘録
### getLastRowは関数も含む
`getLastRow` で値を含む最後の行を取得できます。  
「値を含む」には、関数も含みます。

### 関数をコピーする
GASで行を追加する際、関数が込みで行追加は面倒。  
便利な関数が[copyTo](https://developers.google.com/apps-script/reference/spreadsheet/range#copytodestination,-copypastetype,-transposed)。  
これを使うと関数だけコピーとか、値だけコピーができる。