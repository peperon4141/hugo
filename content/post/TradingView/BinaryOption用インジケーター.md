---
title: "BinaryOption用インジケーター"
date: 2021-09-10T19:13:45+09:00
linkTitle: "BinaryOption用インジケーター"
description: "BinaryOption用インジケーター"
---

## はじめに
TradingViewでBinaryOption用のインジケーターを研究中です。  
今回は以下のインジケーターを見てみます。
https://jp.tradingview.com/script/s48QJlfi-Vdub-Binary-Options-SniperVX-v1/

## PineScript
``` javascript
//@version=4
study("Vdub Binary Options SniperVX  v1", overlay=true, shorttitle="Vdub_SniperBX_v1")
//
//====================channel======================
len = input(8, minval=1)
src = input(close, title="Source")
out = sma(src, len)
last8h = highest(close, 13)
lastl8 = lowest(close, 13)
bearish = cross(close,out) == 1 and close[1] > close
bullish = cross(close,out) == 1 and close[1] < close
channel2=input(false, title="Bar Channel On/Off")
ul2=plot(channel2?last8h:last8h==nz(last8h[1])?last8h:na, color=color.black, linewidth=1, style=plot.style_linebr, title="Candle body resistance level top", offset=0)
ll2=plot(channel2?lastl8:lastl8==nz(lastl8[1])?lastl8:na, color=color.black, linewidth=1, style=plot.style_linebr, title="Candle body resistance level bottom", offset=0)
//
//--------------------Trend colour ema------------------------------------------------//    ema trend direction trigger For Singals 1 & 2
src0 = close, len0 = input(13, minval=1, title="Trend Change EMA")
ema0 = ema(src0, len0)
plot_color = ema0 >= ema0[2]  ? color.lime: ema0 < ema0[2] ? color.red : na
plot(ema0, title="EMA", style=plot.style_line, linewidth=1, color = plot_color)
//
//--Modified vyacheslav.shindin-------------------------------------------------//           Signal 1
//Configured ema signal output
slow = 8
fast = 5
vh1 = ema(highest(avg(low, close), fast), 5)
vl1 = ema(lowest(avg(high, close), slow), 8)
//
e_ema1 = ema(close, 1)
e_ema2 = ema(e_ema1, 1)
e_ema3 = ema(e_ema2, 1)
tema = 1 * (e_ema1 - e_ema2) + e_ema3
//
e_e1 = ema(close, 8)
e_e2 = ema(e_e1, 5)
dema = 2 * e_e1 - e_e2
signal = tema > dema ? max(vh1, vl1) : min(vh1, vl1)
is_call = tema > dema and signal > low and (signal-signal[1] > signal[1]-signal[2])
is_put = tema < dema and signal < high and (signal[1]-signal > signal[2]-signal[1])
 
plotshape(is_call ? 1 : na, title="BUY ARROW", color=color.green, text="*BUY*", style=shape.arrowup, location=location.belowbar)
plotshape(is_put ? -1 : na, title="SELL ARROW", color=color.red, text="*SELL*", style=shape.arrowdown)
//
//Modified - Rajandran R Supertrend----------------------------------------------------- //       Signal 2
Factor=input(1, minval=1,maxval = 000, title="Trend Transition Signal")
Pd=input(1, minval=1,maxval = 100)
Up=hl2-(Factor*atr(Pd))
Dn=hl2+(Factor*atr(Pd))

TrendUp = 0.0
TrendDown = 0.0
Trend = 0.0
TrendUp := close[1]>TrendUp[1]? max(Up,TrendUp[1]) : Up
TrendDown := close[1]<TrendDown[1]? min(Dn,TrendDown[1]) : Dn
Trend := close > TrendDown[1] ? 1: close< TrendUp[1]? -1: nz(Trend[1],0)
 
plotarrow(Trend == 1 and Trend[1] == -1 ? Trend : na, title="Up Entry Arrow", colorup=color.rgb(0, 255,0, 85), maxheight=1000, minheight=50)
plotarrow(Trend == -1 and Trend[1] == 1 ? Trend : na, title="Down Entry Arrow", colordown=color.rgb(255, 0, 0, 85), maxheight=1000, minheight=50)
// Moddified [RS]Support and Resistance V0
RST = input(title='Support / Resistance length:', type=input.integer, defval=21)
RSTT = valuewhen(high >= highest(high, RST), high, 0)
RSTB = valuewhen(low <= lowest(low, RST), low, 0)
RT2 = plot(RSTT, color=RSTT != RSTT[1] ? na : color.red, linewidth=1, offset=0)
RB2 = plot(RSTB, color=RSTB != RSTB[1] ? na : color.green, linewidth=1, offset=0)
//
//===============================Directional Projection=======================================//
tf2 = input('1', title="Trend Projection TF / Mins/D/W")
M2 = input('ATR')
P2 = input(13.00, type=input.float)
W2 = input(1)
pf2 = pointfigure(syminfo.tickerid, 'close', M2, P2, W2)
spfc2 = security(pf2, tf2, close)
channel3=input(false, title="Connect Projection High/Low")
p22=plot(channel3?spfc2:spfc2==nz(spfc2[1])?spfc2:na, color=color.blue, linewidth=2, style=plot.style_linebr, title="Directional Projection", offset=0)
//----------------------------------------------------------------------//
```

## 解説

### 指数移動平均線を描画
指数移動平均線を、上昇中はLime,下降時はRedで描画する。  
``` javascript
//@version=4
study("Vdub Binary Options SniperVX  v1", overlay=true, shorttitle="Vdub_SniperBX_v1")
//
//====================channel======================
len = input(8, minval=1)
src = input(close, title="Source")
out = sma(src, len)
last8h = highest(close, 13)
lastl8 = lowest(close, 13)
bearish = cross(close,out) == 1 and close[1] > close
bullish = cross(close,out) == 1 and close[1] < close
channel2=input(false, title="Bar Channel On/Off")
ul2=plot(channel2?last8h:last8h==nz(last8h[1])?last8h:na, color=color.black, linewidth=1, style=plot.style_linebr, title="Candle body resistance level top", offset=0)
ll2=plot(channel2?lastl8:lastl8==nz(lastl8[1])?lastl8:na, color=color.black, linewidth=1, style=plot.style_linebr, title="Candle body resistance level bottom", offset=0)
//
//--------------------Trend colour ema------------------------------------------------//    ema trend direction trigger For Singals 1 & 2
src0 = close, len0 = input(13, minval=1, title="Trend Change EMA")
ema0 = ema(src0, len0)
plot_color = ema0 >= ema0[2]  ? color.lime: ema0 < ema0[2] ? color.red : na
plot(ema0, title="EMA", style=plot.style_line, linewidth=1, color = plot_color)
```
- [sma](https://jp.tradingview.com/pine-script-reference/#fun_sma):
  - `sma(source, length) → series[float]`
  - 単純移動平均を計算する
- highest/lowest:  
  - 構文: `highest(source, length) → series[float]`
  - 指定された期間(length)の期間の最高値を返す
- cross:
  - 構文: `cross(x, y) → series[bool]`
  - 2つの系列が互いに交差する場合はtrue、そうでない場合はfalse
- [nz](https://jp.tradingview.com/pine-script-reference/#fun_nz):
  - NaN値を直列の0(または指定された値)に置き換える
- [ema](https://jp.tradingview.com/pine-script-reference/#fun_ema):
  - 構文: `ema(source, length) → series[float]`
  - 指数加重移動平均を返す
- `plot_color = ema0 >= ema0[2]  ? lime: ema0 < ema0[2] ? red : na`
  - 指数移動平均で、２個前のバーよりも高ければ`lime`、低ければ`red`

### 売買シグナルを描画する
``` javascript
//
//--Modified vyacheslav.shindin-------------------------------------------------//           Signal 1
//Configured ema signal output
slow = 8
fast = 5
vh1 = ema(highest(avg(low, close), fast), 5)
vl1 = ema(lowest(avg(high, close), slow), 8)
//
e_ema1 = ema(close, 1)
e_ema2 = ema(e_ema1, 1)
e_ema3 = ema(e_ema2, 1)
tema = 1 * (e_ema1 - e_ema2) + e_ema3
//
e_e1 = ema(close, 8)
e_e2 = ema(e_e1, 5)
dema = 2 * e_e1 - e_e2
signal = tema > dema ? max(vh1, vl1) : min(vh1, vl1)
is_call = tema > dema and signal > low and (signal-signal[1] > signal[1]-signal[2])
is_put = tema < dema and signal < high and (signal[1]-signal > signal[2]-signal[1])
 
plotshape(is_call ? 1 : na, title="BUY ARROW", color=color.green, text="*BUY*", style=shape.arrowup, location=location.belowbar)
plotshape(is_put ? -1 : na, title="SELL ARROW", color=color.red, text="*SELL*", style=shape.arrowdown)
```
- [plotshape](https://jp.tradingview.com/pine-script-reference/#fun_plotshape):
  - 構文: `plotshape(series, title, style, location, color, transp, offset, text, textcolor, editable, size, show_last, display) → void`
  - チャート上に視覚的な図形を描写する

### トレンドを表す大きな矢印を表示する
大きなトレンド転換を表す矢印を表示する。  
``` javascript
//
//Modified - Rajandran R Supertrend----------------------------------------------------- //       Signal 2
Factor=input(1, minval=1,maxval = 000, title="Trend Transition Signal")
Pd=input(1, minval=1,maxval = 100)
Up=hl2-(Factor*atr(Pd))
Dn=hl2+(Factor*atr(Pd))

TrendUp = 0.0
TrendDown = 0.0
Trend = 0.0
TrendUp := close[1]>TrendUp[1]? max(Up,TrendUp[1]) : Up
TrendDown := close[1]<TrendDown[1]? min(Dn,TrendDown[1]) : Dn
Trend := close > TrendDown[1] ? 1: close< TrendUp[1]? -1: nz(Trend[1],0)
 
plotarrow(Trend == 1 and Trend[1] == -1 ? Trend : na, title="Up Entry Arrow", colorup=color.rgb(0, 255,0, 85), maxheight=1000, minheight=50)
plotarrow(Trend == -1 and Trend[1] == 1 ? Trend : na, title="Down Entry Arrow", colordown=color.rgb(255, 0, 0, 85), maxheight=1000, minheight=50)
// Moddified [RS]Support and Resistance V0
RST = input(title='Support / Resistance length:', type=input.integer, defval=21)
RSTT = valuewhen(high >= highest(high, RST), high, 0)
RSTB = valuewhen(low <= lowest(low, RST), low, 0)
RT2 = plot(RSTT, color=RSTT != RSTT[1] ? na : color.red, linewidth=1, offset=0)
RB2 = plot(RSTB, color=RSTB != RSTB[1] ? na : color.green, linewidth=1, offset=0)
```
- [atr](https://jp.tradingview.com/pine-script-reference/#fun_atr):

### ステップを表示する
指定した平均線(デフォルトATR)を表示する
``` javascript
//
//===============================Directional Projection=======================================//
tf2 = input('1', title="Trend Projection TF / Mins/D/W")
M2 = input('ATR')
P2 = input(13.00, type=input.float)
W2 = input(1)
pf2 = pointfigure(syminfo.tickerid, 'close', M2, P2, W2)
spfc2 = security(pf2, tf2, close)
channel3=input(false, title="Connect Projection High/Low")
p22=plot(channel3?spfc2:spfc2==nz(spfc2[1])?spfc2:na, color=color.blue, linewidth=2, style=plot.style_linebr, title="Directional Projection", offset=0)
//----------------------------------------------------------------------//
```
- [pointfigure](https://jp.tradingview.com/pine-script-reference/#fun_pointfigure):
  - `pointfigure(symbol, source, style, param, reversal) → string`
  - ポイント&フュイギュア値を要求するティッカー識別子を作成する