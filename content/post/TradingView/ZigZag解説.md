---
title: "ZigZag解説"
date: 2021-09-10T08:14:59+09:00
linkTitle: "ZigZag解説"
description: "ZigZag解説"
---

## はじめに
ZigZagのインジケーターを見つけたので、自分で作れるレベルまで理解を進めたいと思います。

## PineScript

```
//@version=3
study("ZigZag!",overlay=true)
use_current_res=input(true,title="Use Current Resolution?")
length = input(title="Length", type=integer, defval=10)
phase = input(title="Phase", type=integer, defval=50)
power = input(title="Power", type=integer, defval=2)
line_widht = input(title="Line Width", type=integer, defval=1)
do_col = input(true,title="color up and down moves?")

//UseFixed = input(title="Use Fixed Timeframes?", type=bool, defval=false)
htf = input(title="Higher Timeframe", defval="005", options=["M", "W", "3D", "D", "720", "360", "240", "180", "120", "060", "030", "015", "010", "005", "003", "001"])

o = security(tickerid, htf, open)
h = security(tickerid, htf, high)
l = security(tickerid, htf, low)
c = security(tickerid, htf, close)

src = use_current_res ? ohlc4 : (o + h + l + c)/4

// definition of "Jurik Moving Average", by Everget
jma(_src,_length,_phase,_power) =>
    phaseRatio = _phase < -100 ? 0.5 : _phase > 100 ? 2.5 : _phase / 100 + 1.5
    beta = 0.45 * (_length - 1) / (0.45 * (_length - 1) + 2)
    alpha = pow(beta, _power)
    jma = 0.0
    e0 = 0.0
    e0 := (1 - alpha) * _src + alpha * nz(e0[1])
    e1 = 0.0
    e1 := (_src - e0) * (1 - beta) + beta * nz(e1[1])
    e2 = 0.0
    e2 := (e0 + phaseRatio * e1 - nz(jma[1])) * pow(1 - alpha, 2) + pow(alpha, 2) * nz(e2[1])
    jma := e2 + nz(jma[1])

//calculate jma turning point
jma_price = jma(src,length,phase,power)
turn_down = rising(jma_price[1],1) and not rising(jma_price,1)
turn_up = falling(jma_price[1],1) and not falling(jma_price,1)

pivot=na
pivot:=
 turn_down?highest(high,10):
 turn_up?lowest(low,10):na

pivot_color=
 do_col?
  pivot<fixnan(pivot)[1]?red:lime:
 yellow

plot(pivot,linewidth=line_widht,color=pivot_color,offset=-2,transp=0)

// plotshape(turn_down?fixnan(pivot):na,title="top",style=shape.triangledown,location=location.absolute,size=size.tiny,color=red,transp=0)
// plotshape(turn_up?fixnan(pivot):na,title="bottom",style=shape.triangleup,location=location.absolute,size=size.tiny,color=lime,transp=0)
```

## 解説
### インジケーターの定義
```
//@version=3
study("ZigZag!",overlay=true)
```
- `//@version=3`: バージョンを指定しており、現時点の最新は４です
- `study`: インジケーターを意味しています。strategyを指定すると売買ソフトを意味します。  
- `"ZigZag!"`: インジケーターのタイトルを指定します
- `overlay=true`: チャートに重ねるタイプのインジケーターにします

### 設定値
```
use_current_res=input(true,title="Use Current Resolution?")
length = input(title="Length", type=integer, defval=10)
phase = input(title="Phase", type=integer, defval=50)
power = input(title="Power", type=integer, defval=2)
line_widht = input(title="Line Width", type=integer, defval=1)
do_col = input(true,title="color up and down moves?")

//UseFixed = input(title="Use Fixed Timeframes?", type=bool, defval=false)
htf = input(title="Higher Timeframe", defval="005", options=["M", "W", "3D", "D", "720", "360", "240", "180", "120", "060", "030", "015", "010", "005", "003", "001"])
```

- `input`: インジケーターの設定値として定義します
- `type`: 設定値の種類です
- `title`: 設定値のタイトルです
- `defval`: 設定値のデフォルト値です

### 別の時間足を取得
```
o = security(tickerid, htf, open)
h = security(tickerid, htf, high)
l = security(tickerid, htf, low)
c = security(tickerid, htf, close)
```
- [security](https://jp.tradingview.com/pine-script-reference/#fun_security): 別のシンボル/時間足をリクエスト
  - `security(symbol, resolution, expression) → series`: の形式で使用
  - `symbol (string)`: シンボル
  - `resolution (string)`: 時間足。空の文字列はチャートの現在の時間足になる。
  - `expression`: 系列または系列に型変換できる要素を含むタプル
- [tickerid](https://jp.tradingview.com/pine-script-reference/#var_syminfo{dot}tickerid): 現在選択している通貨のシンボル

### 元になるシリーズを指定 
`use_current_res` なtrueなら現在の時間足を使用し、falseなら指定された時間足のデータを使用します。  
```
src = use_current_res ? ohlc4 : (o + h + l + c)/4
```
- `XXX ? YYY : ZZZ`: 三項演算子
- [ohlc4](https://jp.tradingview.com/pine-script-reference/#var_ohlc4): (始値+高値+安値+終値)/4

### 独自関数を定義
`Jurik Moving Average(ジュリック移動平均)`を求めている。
```
jma(_src,_length,_phase,_power) =>
    phaseRatio = _phase < -100 ? 0.5 : _phase > 100 ? 2.5 : _phase / 100 + 1.5
    beta = 0.45 * (_length - 1) / (0.45 * (_length - 1) + 2)
    alpha = pow(beta, _power)
    jma = 0.0
    e0 = 0.0
    e0 := (1 - alpha) * _src + alpha * nz(e0[1])
    e1 = 0.0
    e1 := (_src - e0) * (1 - beta) + beta * nz(e1[1])
    e2 = 0.0
    e2 := (e0 + phaseRatio * e1 - nz(jma[1])) * pow(1 - alpha, 2) + pow(alpha, 2) * nz(e2[1])
    jma := e2 + nz(jma[1])
```
- `phaseRatio = _phase < -100 ? 0.5 : _phase > 100 ? 2.5 : _phase / 100 + 1.5`  
  - `_phase`が100より小さければ0.5
  - `_phase`が100より大きければ2.5
  - `_phase`がそれ以外であれば、`_phase`を100で割って1.5を足す
- `alpha = pow(beta, _power)`: `beta`の`_power`乗をalphaに代入

### 交差の判定
```
//calculate jma turning point
jma_price = jma(src,length,phase,power)
turn_down = rising(jma_price[1],1) and not rising(jma_price,1)
turn_up = falling(jma_price[1],1) and not falling(jma_price,1)
```
- `jma_price = jma(src,length,phase,power)`: JMAを計算
- [rising](https://jp.tradingview.com/pine-script-reference/#fun_rising):  
  `rising(source, length) → series[bool]`  
  現在のxが過去yバーに対する前のxよりも大きい場合はtrue、そうでない場合はfalse。
- [falling](https://jp.tradingview.com/pine-script-reference/#fun_falling):  
  `falling(source, length) → series[bool]`  
  現在のxが過去yバーに対する前のxよりも小さい場合はtrue、そうでない場合はfalse。
- `turn_down = rising(jma_price[1],1) and not rising(jma_price,1)`  
  「1つ前のバーが上昇しており、現在のバーが上昇していない」の判定結果を`turn_down`に代入。
- `turn_up = falling(jma_price[1],1) and not falling(jma_price,1)`  
  「1つ前のバーが下降しており、現在のバーが下降していない」の判定結果を`turn_up`に代入。

### 描画する元データを計算
`turn_down`がtrueなら高値を、`turn_up`がtrueなら底値を、それ以外はnaを入れる。
```
pivot=na
pivot:=
 turn_down?highest(high,10):
 turn_up?lowest(low,10):na
```
- `na`: 無効な値のシリーズ

### 描画
pivotを元にZigZagを描画
```
plot(pivot,linewidth=line_widht,color=pivot_color,offset=-2,transp=0)
```