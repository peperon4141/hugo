---
title: "WordPressのオリジナルテーマを作成"
date: 2021-08-01T15:08:32+09:00
linkTitle: "WordPressのオリジナルテーマを作成"
description: "WordPressのオリジナルテーマを作成"
---

## はじめに
WordPressでオリジナルテーマ作成時に基本となる知識を整理しました。

## テーマ階層
WordPressは以下のテンプレート階層に従って各種ページに対して適用されるテンプレートファイルを決定している。  
ページにアクセスした場合、この図の左から順番に優先的に最適なテンプレートが選び出される。  
![WordPress テンプレート階層](http://wpdocs.osdn.jp/wiki/images/wp-template-hierarchy.jpg)

index.phpは全てのページに適用される最も優先度が低いテンプレートファイルです。  

[テンプレート階層](https://wpdocs.osdn.jp/%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E9%9A%8E%E5%B1%A4)

## テーマの最小構成
テーマを作成するのに必要な最低限のファイルは以下です。  
- index.php
- style.css

## WordPressで理解必須のループ
`ループ`とはWordPressの投稿を表示するために使用される処理です。  
[テンプレートタグ](https://wpdocs.osdn.jp/%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E3%82%BF%E3%82%B0)やプラグインの一部の説明で、`このタグ（プラグイン）はループ内で使います`とある場合、そのタグはループの中で使う必要があります。  

例として、`the_title()`（投稿のタイトルを取得する）は、ループ内でしか使用できません。  

ループは以下のように書きます。  
```
<?php 
if ( have_posts() ) {
	while ( have_posts() ) {
		the_post(); 
		//
		// 投稿がここに表示される
		//
	} // end while
} // end if
?>
```

## 参考
- [ループ](https://wpdocs.osdn.jp/%E3%83%AB%E3%83%BC%E3%83%97)