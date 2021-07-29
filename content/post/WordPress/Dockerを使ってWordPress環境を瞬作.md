---
title: "Dockerを使ってWordPress環境を瞬作"
date: 2021-07-29T19:07:24+09:00
linkTitle: "Dockerを使ってWordPress環境を瞬作"
description: "Dockerを使ってWordPress環境を瞬作"
---

## はじめに
色んな技術を勉強する時に、一番厄介なのが環境構築です。  
失敗しても捨ててすぐに作りなおせるような環境があれば、勉強が捗りますよね？  
そこでdockerを使ってWordPress環境を構築できるようにしました。  

## docker-composeで一瞬で環境構築
```
version: '3'
services:
  wp:
    container_name: wordpress # 名前を付ける
    image: wordpress:5.4-php7.4-apache # 基となるdockerイメージを設定
    ports: # docker内の80ポートを8080ポートとして使用
      - 8080:80
    depends_on: # dbを待ってから立ち上げる
      - db
    environment: # 環境変数を設定する
      WORDPRESS_DB_HOST: mysql:3306 # mysqlサーバーの3306ポートを指定
      WORDPRESS_DB_PASSWORD: password # データベースのパスワード
      WORDPRESS_DB_NAME: wordpress # データベースの名前
      WORDPRESS_DB_USER: wp_user # データベースのユーザー名
    volumes: # ホストPCにボリュームをマウントする
      - ./apache/log:/var/log/apache2
      - ./public:/var/www/html
  db:
    container_name: mysql 
    image: mysql:5.7
    environment: # WordPressの方で指定した設定と同じにしておく必要がある
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wp_user
      MYSQL_PASSWORD: password
    volumes:
      - ./mysql:/var/lib/mysql
```
docker-compose.ymlというファイルを作成し、上記を書きます。  
あとは以下のコマンドを実行します。  
```
docker-compose up
```
`-d`: オプションでバックグラウンドで実行  
{ .info }

[http://localhost:8080/](http://localhost:8080/)にアクセスすると、WordPressの設定画面が確認できます。  

![WordPress設定画面](/images/WordPress/1.png)

あとは画面に従って操作するだけです。  

## WordPressの階層を変える
`wp:` の下の階層に `working_dir: /var/www/html/WordPress` を追加できます。  
こうすることで、WordPressディレクトリ以下を基本としてWordPressを起動します。  
この設定で、サブディレクトリにWordPressがある場合にも対応できます。  

## voluems
```
volumes:
  - ./apache/log:/var/log/apache2
  - ./public:/var/www/html
```
この設定でホストPCにDocker内のファイルをマウントできます。  

`./apache/log:/var/log/apache2`の設定で、WordPressのログが確認できます。  
`./public:/var/www/html`の設定で、WordPressの中身を確認できます。  

## その他コマンド

### 終了
終了するには `Ctrl` + `C`です。  
停止中のコンテナが邪魔な場合は以下で消すことができます。  

```
docker-compose rm -sf
```
`-f, --force`: オプションで確認なしで実行  
`-s, --stop`: 必要なら削除前にコンテナを停止する
{ .info }

### コンテナの中に入る
WordPressのDockerコンテナに入るには以下のコマンドです。  
```
docker exec -it wordpress bash
```

### 起動中コンテナの確認
```
docker ps
```
`-a, --all`: 停止中のコンテナを含めて表示する  
{ .info }
