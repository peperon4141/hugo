---
title: "BinaryOptionテストテンプレート"
date: 2021-09-11T10:15:33+09:00
linkTitle: "BinaryOptionテストテンプレート"
description: "BinaryOptionテストテンプレート"
---

## はじめに
バイオプと通常のFXとは全く異なるため、通常TradingViewではバイオプロジックの検証ができません。  
ですが、指定した期間で強制決済した結果を集計することで、バイオプとしてのロジックを検証することができます。  
今回は、テンプレートを見つけましたので確認していきます。  
https://jp.tradingview.com/script/pvnR5RYJ-Binary-Options-Strategy-Template/

## 解説
以下は終値が単純移動平均より上ならBUY、下ならSELLという単純なロジックだけでバイオプをした場合の検証です。  
これを実際のロジックに置き換えて作る必要があります。  
その前提で、このスクリプトを見ていきましょう。  
``` javascript
//@version=4
strategy("Binary Options Strategy Template", overlay=true)

// In this code we track the bar where a position was opened and close the position
// aftera specified number of bars. The objective of this script is testing long/short signals
// for knowing the amount of times it would turn a profit or not.

// User input for amount of bars till close
barsTillClose = input(5, minval=2, title="Amount of Bars Till Close Position")


// SIMPLE ENTRY LOGIC (insert long/short signal here)
sma = sma(close, 14)
strategy.entry("Long", strategy.long, when=close > sma)
strategy.entry("Short", strategy.long, when=close < sma)

// Track the Entry Bar
entryTime = float(na)
timeClose = bool(na)
entryTime := timeClose[1] ? na : strategy.position_size[0] > strategy.position_size[1] ? bar_index : entryTime[1]

// See if we need to close
timeClose := bar_index >= entryTime+(barsTillClose-2)
strategy.close("Long", when=timeClose)
strategy.close("Short", when=timeClose)

plot(sma)
```

### エントリーロジック
単純な終値が単純移動平均線を超えるかどうかだけのロジックでエントリーを決めている。  
``` javascript
// SIMPLE ENTRY LOGIC (insert long/short signal here)
sma = sma(close, 14)
strategy.entry("Long", strategy.long, when=close > sma)
strategy.entry("Short", strategy.long, when=close < sma)
```
- `sma`: 単純移動平均線
- [strategy.entry](https://jp.tradingview.com/pine-script-reference/#fun_strategy{dot}entry):
  - 構文: `strategy.entry(id, long, qty, limit, stop, oca_name, oca_type, comment, when, alert_message) → void`
  - `id(series[string])`: 注文の識別子。識別子を指定する事で注文の変更やキャンセルが可能
  - `long (bool)`: 市場ポジションの方向: `strategy.long`はロング。`strategy.short`はショート
  - `when (bool)`: 注文の条件。条件が`true`の場合注文が発注される。条件が`false`の場合には何も起こらない  
    以前発注された同じIDの注文はキャンセルされない。  
    デフォルト値は`true`。

## トラッキング

``` javascript
// Track the Entry Bar
entryTime = float(na)
timeClose = bool(na)
entryTime := timeClose[1] ? na : strategy.position_size[0] > strategy.position_size[1] ? bar_index : entryTime[1]
// See if we need to close
timeClose := bar_index >= entryTime+(barsTillClose-2)
```
- [strategy.position_size](https://jp.tradingview.com/pine-script-reference/#var_strategy{dot}position_size):
  - 現在の市場ポジションの方向とサイズ。値が0より大きい場合、市場ポジションは買い。値が0より少ない場合、市場ポジションは売り。
- `entryTime := timeClose[1] ? na : strategy.position_size[0] > strategy.position_size[1] ? bar_index : entryTime[1]`
  - １つ過去のバーでクローズしていれば`na`
  - エントリーした場合は`bar_index`
  - それ以外は過去の値を継続
- `timeClose := bar_index >= entryTime+(barsTillClose-2)`
  - 現在の`bar_index`がエントリーした時のbar_indexに`barsTillClose`を足して２で引いた値以上の場合に決済

## 決済ロジック
バイオプの指定期間以上になったら決済する。  
``` javascript
strategy.close("Long", when=timeClose)
strategy.close("Short", when=timeClose)
```
- [bar_index](https://jp.tradingview.com/pine-script-reference/#var_bar_index):
  - type: series[integer]
  - 現在のバーのインデックス。ナンバリングは0から始まり、最初のバーのインデックスは0
- [strategy.close](https://jp.tradingview.com/pine-script-reference/#fun_strategy{dot}close):
  - 構文: `strategy.close(id, when, comment, qty, qty_percent, alert_message) → void`