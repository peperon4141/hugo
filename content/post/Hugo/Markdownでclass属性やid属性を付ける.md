---
title: "Markdownでclass属性やid属性を付ける"
date: 2021-07-11T14:01:14+09:00
linkTitle: "Markdownでclass属性やid属性を付ける"
---

## はじめに
通常Markdownで記載していると、独自のclass属性やid属性が指定できません。  
ただし、だからと言って直接HTMLを記載するとMarkdownで書くというメリットが失われます。  

Markdownで書きつつ、class属性やid属性を付ける方法を説明します。  

## markup.goldmark.parser.attribute
装飾したいMarkdown要素の後に`{}`で囲んだ属性リストを追加することで、独自の属性を追加できます。  
この機能を使用するためにはconfig.tomlに以下の設定が必要です。  
```
[markup.goldmark.parser.attribute]
  block = true
```

ただし、この機能はv0.81.0からHugoに追加された機能です。
{ .warn }

例えば以下のMarkdownを変換してみます。  
```
この文章は警告です。
{ .warn }
```

```
<p class="warn">この文章は警告です。</p>
```

## 参考
- [Configure Markup](https://gohugo.io/getting-started/configuration-markup/)