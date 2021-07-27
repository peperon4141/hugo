---
title: "PineScript入門"
date: 2021-07-26T17:13:59+09:00
linkTitle: "入門"
description: "入門"
---

## はじめに
PineScriptはトレードのインジケータを作成するための言語です。  
独自の言語なので少し癖があります。  
この記事では、[Quickstart guide](https://www.tradingview.com/pine-script-docs/en/v4/Quickstart_guide.html)で紹介されているインジケータを解説します。  

## 対象のインジケータのコード
```
//@version=4
study("MACD")
fast = 12, slow = 26
fastMA = ema(close, fast)
slowMA = ema(close, slow)
macd = fastMA - slowMA
signal = sma(macd, 9)
plot(macd, color=color.blue)
plot(signal, color=color.orange)
```

- Line 1: `//@version=4`  
  この行はコンパイラにスクリプトのバージョンを伝えるコメントです。
- Line 2: `study("MACD")`  
  `MACD`というチャートの名前を定義しています。  
  `study`はインジケータ、`strategy`がEAを意味します。
- Line 3: `fast = 12, slow = 26`  
  2つの変数を定義しています。
- Line 4: `fastMA = ema(close, fast)`  
  EMA(Exponential Moving Average)を計算した結果をfastMAに代入します。  
  [ema](https://jp.tradingview.com/pine-script-reference/#fun_ema)はビルトイン関数です。  
  closeのシリーズを元に計算し、期間はfast（12）です。  
- Line 5: `slowMA = ema(close, slow)`  
  4行目と同じですが、期間はslow（26）で、slowMAに計算結果を代入します。
- Line 6: `macd = fastMA - slowMA`  
  fastMA と slowMA の差を求めmacd変数に代入します。
- Line 7: `signal = sma(macd, 9)`  
  macdを使って、SMA(Simple Moving Average)を計算し、signal変数に代入します。  
- Line 8: `plot(macd, color=color.blue)`
  macd変数を青線でプロットするため、plot関数を使用します。  
- Line 9: `plot(signal, color=color.orange)`
  signal変数をオレンジ線でプロットするため、plot関数を使用します。

`MACD`を実行すると次のようなチャートが見れます。  
![MACD](https://www.tradingview.com/pine-script-docs/en/v4/_images/Macd_pine.png)

### study と strategy
strategyはバックテストの実行に使用されます。  
studyの実行に比べて、strategyはstrategy.*()のような売り・買いの実行をブローカーエミュレーターに対してシミュレートします。  

studyはバックテストには使用できず、ブローカーへの注文もしません。  
その分少ないリソースで高速に実行できます。  

Strategyはデフォルトでは、履歴バー毎に実行されますが、価格変更毎に実行することも可能です。  
詳細：[Execution model](https://www.tradingview.com/pine-script-docs/en/v4/language/Execution_model.html)

### Series
PineScirptで使用される主なデータ型はSeriesと呼ばれます。  
これは現在から過去のバーに遡り、各バーに1つの値を持つ連続リストです。  
これは他の言語で言うところの`配列`のようなものだと思われがちですが、そう考えるのはよくありません。  
詳細：[Series](https://www.tradingview.com/pine-script-docs/en/v4/language/Type_system.html#series)


### PineScriptの実行モデル
PineScriptは他の一般的な一度実行されて止まって終わりの言語とは`異なって`います。  
各履歴バー毎に一回だけ実行されます。  
ただし、最新のリアルタイムバーの場合は、価格やボリュームの変更が検知されたタイミングで一度実行されます。  
また、履歴バーが閉じたタイミングで一度実行されます。  


## 参考
- [Pineスクリプト言語リファレンスマニュアル](https://jp.tradingview.com/pine-script-reference/)
- [Pineスクリプト](https://www.tradingview.com/blog/ja/category/market-analysis/pine/)
- [Pine Script 4 User Manual](https://www.tradingview.com/pine-script-docs/en/v4/index.html)