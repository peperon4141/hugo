---
title: "config.tomlファイルの使い方"
date: 2021-07-11T12:45:54+09:00
linkTitle: "config.tomlファイルの使い方"
description: "Config.tomlファイルの書き方について説明します。"
---

## コンフィグファイルの種類
Hugoではいくつかのコンフィグファイルの種類が定義でき、好きな形式で書くことができます。  
- config.toml
- config.yaml
- config.json

ここでは、TOML形式で定義したコンフィグファイルの説明を行います。  

## config.tomlファイルの読み方
TOMLとJSONファイルを変換できるサイトがあるので、一度確認すると意味がわかりやすいです。
[TOML](https://binarymuse.github.io/toml-node/)

参考にTOMLをJSONに変換したものを載せます。

TOML
```
title = "TOML Example"

[test]
  a = 1

[[table]]
  b = 2

[[table]]
  c = 3

[table3.inner]
  d = 4

[[table2.description]]
  e = 5
```

JSON
```
{
  "title": "TOML Example",
  "test": {
    "a": 1
  },
  "table": [
    {
      "b": 2
    },
    {
      "c": 3
    }
  ],
  "table3": {
    "inner": {
      "d": 4
    }
  },
  "table2": {
    "description": [
      {
        "e": 5
      }
    ]
  }
}
```
TOMLで`[[<PARAM_NAME>]]`のように2重の括弧で囲むと、配列として定義されることがわかります。  
また、パラメータ名を`.`区切りにすることで階層構造を表現できます。  


## 独自定義の変数
```
baseURL = "https://example.com/"
languageCode = "ja-jp"
title = "Hugoまとめ"

[params]
  subtitle = "コツコツとHugoについてナレッジを記載します。"
```

Hugoで独自変数をコンフィグファイルに記載する場合は、`[params]`の部分に記載します。  
使用する場合は`$.Site.Params.subtitle`のように使います。  
`$`を省略して、`.Site.Params.subtitle`としたり、`$.Site.Params.Subtitle`変数名の頭文字を大文字にしても構いません。  

## 参照
- [Configure Hugo](https://gohugo.io/getting-started/configuration/)  
- [Site Variables](https://gohugo.io/variables/site/)
