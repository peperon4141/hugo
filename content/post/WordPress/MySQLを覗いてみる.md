---
title: "MySQLを覗いてみる"
date: 2021-07-29T19:08:24+09:00
linkTitle: "MySQLを覗いてみる"
description: "MySQLを覗いてみる"
---

## はじめに
前回の[Dockerを使ってwordpress環境を瞬作](../dockerを使ってwordpress環境を瞬作/)という投稿で、WordPressを立ち上げました。  
今回は立ち上げたことを前提として、MySQLファイルを覗いていきましょう。

## MySQLにログインする
まずは、MySQLのDockerコンテナ内に入ります。  
```
docker exec -it mysql bash
```
入った後、MySQLにログインします。  
```
mysql -u wp_user -ppassword
```
`-u`: ユーザー名  
`-p`: パスワード  
{ .info }

## データベースの一覧
```
$ show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| wordpress          |
+--------------------+
2 rows in set (0.10 sec)
```
`wordpress`という名前のデータベースがあることがわかります。  

## テーブル一覧 
`use wordpress;` でデータベースを指定できます。  
テーブル一覧を見てみましょう。  
```
$ show tables;
+-----------------------+
| Tables_in_wordpress   |
+-----------------------+
| wp_commentmeta        |
| wp_comments           |
| wp_links              |
| wp_options            |
| wp_postmeta           |
| wp_posts              |
| wp_term_relationships |
| wp_term_taxonomy      |
| wp_termmeta           |
| wp_terms              |
| wp_usermeta           |
| wp_users              |
+-----------------------+
12 rows in set (0.00 sec)
``` 
`show table status;`: このコマンドでより詳細を見ることができます。  
{ .info }

## ユーザーを確認する
例として、ユーザーテーブルを見てみましょう。  
```
$ select * from wp_users;
+----+------------+------------------------------------+---------------+-----------------------+-----------------------+---------------------+---------------------+-------------+--------------+
| ID | user_login | user_pass                          | user_nicename | user_email            | user_url              | user_registered     | user_activation_key | user_status | display_name |
+----+------------+------------------------------------+---------------+-----------------------+-----------------------+---------------------+---------------------+-------------+--------------+
|  1 | admin      | $P$BIGZ1.I.CRyv4EbxMZ1Jpt/iQNSEWV/ | admin         | example@gmail.com | http://localhost:8080 | 2021-07-29 11:32:15 |                     |           0 | admin        |
+----+------------+------------------------------------+---------------+-----------------------+-----------------------+---------------------+---------------------+-------------+--------------+
1 row in set (0.00 sec)
```
