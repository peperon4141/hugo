---
title: "Git submoduleを理解する"
date: 2021-07-20T07:32:10+09:00
linkTitle: "Git submoduleを理解する"
description: "Git submoduleを理解する"
---

## はじめに
Git submoduleとは外部のGitリポジトリを、自分のリポジトリのサブディレクトリとして登録する仕組みです。

## コマンドの使い方
頻出するコマンドをまとめます。  
今回はサンプルとして、MainroadというHugoのテーマを使います。  
ローカルワークスペースのthemes/mainroadディレクトリ以下に追加していきます。  

### 追加
`git submodule add <リポジトリのURL> <ローカルのサブディレクトリ>`

```
git submodule add https://github.com/Vimux/Mainroad.git themes/mainroad
```

`themes/mainroad`以下にmainroadがクローンされます。  

### 更新
`git submodule update`

### 削除
`git submodule deinit -f <サブモジュール>`: submoduleを削除  
`git rm -f <サブモジュール>`: gitの管理から削除  
`rm -rf .git/modules/<サブモジュール>`: .gitからgit情報を削除  

```
git submodule deinit themes/mainroad
git rm -f themes/mainroad
rm -rf .git/modules/themes/mainroad
```

## submoduleを追加したときに起こっていること
submoduleを理解するために、どんなことが起こっているのかを整理しておきましょう。

### 追加されたファイルを確認
```
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   .gitmodules
        new file:   themes/mainroad
```

`.gitmodules`ファイルと`themes/mainroad`ディレクトリが追加されていることがわかります。  

### .gitmodulesファイルの中身
`.gitmodules`の中身は以下のようになっています。  

```
[submodule "themes/mainroad"]
	path = themes/mainroad
	url = https://github.com/Vimux/Mainroad.git
```

`path`: ローカルのパス  
`url`: submoduleとして読み込んだリポジトリのURL  

### .gitディレクトリ内への情報の追加
通常Gitを使っていると、`.git`ディレクトリが追加され、中にはcommitやconfigなどの情報が保存されます。  
submoduleの場合は、modules以下に同様の情報が追加されます。  
今回のサンプルの場合は、`.git/modules/mainroad`ディレクトリに情報が追加されます。  

### 差分チェック
```
$ git diff --cached
diff --git a/.gitmodules b/.gitmodules
new file mode 100644
index 0000000..537ffba
--- /dev/null
+++ b/.gitmodules
@@ -0,0 +1,3 @@
+[submodule "themes/mainroad"]
+       path = themes/mainroad
+       url = https://github.com/Vimux/Mainroad.git
diff --git a/themes/mainroad b/themes/mainroad
new file mode 160000
index 0000000..043befb
--- /dev/null
+++ b/themes/mainroad
@@ -0,0 +1 @@
+Subproject commit 043befbc585e5a1d7859cfd1f1700d9a5a09cca8
```

`Subproject commit 043befbc585e5a1d7859cfd1f1700d9a5a09cca8`が重要です。  
- mainroadの`043befbc585e5a1d7859cfd1f1700d9a5a09cca8`コミットを
- themes/mainroadディレクトリにsubdmouleとして登録した
という意味です。

## さいごに
参照: [Git submodule の基礎](https://qiita.com/sotarok/items/0d525e568a6088f6f6bb)