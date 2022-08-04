---
title: "シートがなければ作るというGAS"
date: 2022-08-04T22:32:37+09:00
linkTitle: "シートがなければ作るというGAS"
description: "シートがなければ作るというGAS"
---

## きっかけ
SpreadsheetでGASを使っていて、自分がよくやるのが月毎にシートを分割すること。  
例えば、「2022/01」のシートにはその月の売上をGASで登録する。  
「2022/02」になったら、自動でその名前のシートを作って、登録する。  
便利だが、GASでシートがなければ作るというのが少し面倒だったので、ここにメモしておく。

## やりたいこと
特定のシート名のシートが、そのスプレッドシートに存在するかを確認する。  
もしなければ、テンプレートとなるシートをコピーして、シート名を設定する。
さらに、そのシートを一番左に移動する。  
戻り値として、シートを返す。  

``` JavaScript
function createSheetIfNotExist(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName)
  if (sheet) return sheet

  const templateSheet = ss.getSheetByName('原本')
  const newSheet = ss.insertSheet(sheetName, 1, {template: templateSheet})
  return newSheet
}
```

`insertSheet`関数は、第２引数で新規シートの挿入位置を指定できる。  
さらに、`{template: templateSheet}`のように、テンプレートのシートを指定するオプションがある。  

## まとめ
しっかりGoogleのドキュメントを読めば、サクッと解決できた。  