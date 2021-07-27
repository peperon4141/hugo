---
title: "Seriesとは"
date: 2021-07-26T18:26:57+09:00
linkTitle: "Seriesとは"
description: "Seriesとは"
---

## はじめに
PineScriptを使用する上で、最も重要なのがSeriesの理解です。  
Seriesは若干クセがあるので、しっかりと理解する必要があります。  

## Pineスクリプトの型システム
Pineスクリプトには以下の基本的な9つの`型`が存在します。  
-  int
- float
- bool
- color
- string
- line
- label
- plot
- hline

これらの型はいくつかの`形式`で存在します。  
`形式`には5種類あります。
- literal
- const
- input
- simple
- series

`型`と`形式`は合わせて参照されます。  
例えばliteral bool型、input bool型...のようにコンパイラによって識別されます。  

また、以下のような型も存在します。  
- array
- void
- na (not available)
- tuple type

## 形式
### Literal
Literalは固定された値を表すための特別な表記法です。  
Literalは常に以下のどれかの型形式になります。  
- literal float (3.14, 6.02E-23, 3e8)
- literal int (42)
- literal bool (true, false)
- literal string ("A text literal")
- literal color (#FF55C6)

ビルトインのopen,high,low,...などはLiterarlではありません。  
これらは`serires form`です。
{ .info }

### Const
Const形式の値は次の特徴があります。
- PineScript実行中に変更されない
- コンパイル時に確定されるか計算される

例えば
```
c1 = 0
c2 = c1 + 1
c3 = c1 + 1
if open > close
    c3 := 0
```
`c1`は`const int`です。  
理由は`literal int`によって初期化されるからです。  
`c2`も`const int`で、`const int`だけの計算で初期化されるからです。  
`c3`は`series int`で、理由は実行中に変更されるからです。

### Input
Inputは以下の特徴があります。
- PineScript実行中に変更されない
- コンパイル時には未確定
- input関数に基づいている

例えば
```
p = input(10, title="Period")
```
pは`input integer`です。

### Simple
Simpleは以下の特徴があります。  
- PineScript実行中に変更されない
- コンパイル時に未確定

この値は、チャートのシンボルの情報に基づいています。  
例えば、ビルトイン変数の`syminfo.mintick`は`simple float`です。  
`simple`は省略されることもあるので、単に`float`と呼ばれることもあります。  

### Series
Seriesは以下の特徴があります。
- PineScript実行中に変更される
- メインチャートのシンボルの各バーに関連付けられた履歴の値を保存します
- `[]`演算子を使用してアクセスできる
- seriesの最後（つまり最新のバー）に関連付けられている値のみが読み書き両方できる

seriesはPineScriptで最も一般的な形式です。  
ビルトインのseries変数は例えば、open、high、low、close、volume、timeなどです。  
これらのseriesのサイズは現在のティッカーの時間枠で使用可能なバーの数と同じです。  
Seriesには数値かna（not avairable：使用不可）が含まれる場合があります。  

例えば
```
a = open + close // 2つのSeriesの加算
b = high / 2     // integer literal const による、Seriesの除算
c = close[1]     // 前のcloseの値の参照
```

## 参考
- [Series](https://www.tradingview.com/pine-script-docs/en/v4/language/Type_system.html#series)