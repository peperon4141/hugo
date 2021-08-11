---
title: "CSSのBEMの命名規則を整理"
date: 2021-08-12T08:33:24+09:00
linkTitle: "CSSのBEMの命名規則を整理"
description: "CSSのBEMの命名規則を整理"
---

## はじめに
**BEM（Block-Element-Modifier：ベム）**の理解が曖昧だったので、整理します。

## BEMとは
- HTMLの要素を**Block**、**Element**、**Modifier**で分けて命名すること。  
- Blockはパーツ自体を表す
- Elementはパーツの部品
- Modifierはパーツの状態
- `Block__Element--Modifier` の形式で書く
- 各名前が複数単語の場合は、`-`(ハイフン)で繋ぐ

## BEMのメリデメ
BEMの特徴は、明確な要素を指定したCSSできようですが、以下のメリデメがあります。
### メリット
- CSSの他のパーツへの影響を考えなくてよい
- セレクタを入れ子にしない => 優先度問題を解消
- 広く使われている

### デメリット
- class名が長くなる
- 全ての要素にclass名を付けるので面倒
- Bootstrapと相性が悪い（BootstrapはOOCSSを採用している）

## 例
```
logo__company-name
```
この例では、`Block__Element`の形式で、`Modifier`指定していません。

```
.article-list {
  width: 100%;

  &__article-title {
    font-size: 20px;
  }
}
```
SASSだと、Elementを`&`で追加する。

```
.article-list {
  width: 100%;

  &__article-title {
    font-size: 20px;

    &--red {
      font-size: 20px;
      color: red; 
    }
  }
}
```
Modifierも`&`で追加する。  
命名規則がわかっていると、CSSから意図が汲み取れるので読みやすくなります。  


## 参考
- [class名の命名規則BEMのルールとカスタマイズ](https://jobtech.jp/html_css/4209/)