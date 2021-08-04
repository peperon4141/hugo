---
title: "DockerでRubyOnRails環境を構築"
date: 2021-08-01T15:49:59+09:00
linkTitle: "DockerでRubyOnRails環境を構築"
description: "DockerでRubyOnRails環境を構築"
---

## はじめに
RubyOnRailsの学習のために、すぐにクリーンな環境を作り直せるDockerで環境構築をしていきます。  
DockerDesktopはインストール前提です。  

## ファイルを作成
新規でディレクトリを作成します。  
そのディレクトリに、以下の構成になるようにファイルを作成していきます。  
```
.
├── Dockerfile
├── Gemfile
├── Gemfile.lock
├── docker-compose.yml
└── entrypoint.sh
```

### Dockerfile作成
Dockerfileという名前でファイルを作成し、以下を記述します。  
```
FROM ruby:2.7.0

# yarnをインストール
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# モジュールインストール
RUN apt-get update -qq && apt-get install -y nodejs yarn

# rails_appディレクトリを作成し、作業ディレクトリにする
RUN mkdir /rails_app
WORKDIR /rails_app

# GemfileとGemfile.lockをコピーして、bundlerでインストールする
COPY Gemfile /rails_app/Gemfile
COPY Gemfile.lock /rails_app/Gemfile.lock
RUN bundle install
COPY . /rails_app

# railsが特定のpidが実行されていると起動できない問題の解消
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# サーバーを起動する
CMD ["rails", "server", "-b", "0.0.0.0"]
```

#### 補足
- `apt-get update`のオプション`-qq`は「エラー以外は表示しない」
- COPYとADD  
  COPY: ローカルファイルを再帰的にDocker内にコピーする  
  ADD: COPYとほぼ同じだが、コピー元がアーカイブの場合は展開して使用する。  
  参考: [DockerfileにてなぜADDよりCOPYが望ましいのか](https://qiita.com/momotaro98/items/bf34eef176cc2bdb6892)
- CMDとENTRYPOINT  
  `docker run`した際に実行されるコマンドを指定できる。  
  参考:[[docker] CMD とENTRYPOINT の違いを試してみた](https://qiita.com/hihihiroro/items/d7ceaadc9340a4dbeb8f)
- rails_appディレクトリはRailsの構成が入るディレクトリです
- `bundle config --local set path 'vendor/bundle'`で`vendor/bundle`以下にgemを配置
- Rails6系では、webpackerが標準になった。  
  またそれに関連して、yarnをインストールが必要になった。  
  そのためまずはyarnのインストールと、webpacker:installの実行が必要。  

### docker-compose.yml
```
version: '3'
services:
  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: root
    ports:
      - "3306:3306"
    volumes:
      - ./tmp/db:/var/lib/mysql

  web:
    build: .
    command: bash -c "rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"
    volumes:
      - .:/rails_app
    ports:
      - "3000:3000"
    depends_on:
      - db
```

### Gemfile
```
source 'https://rubygems.org'
gem 'rails', '6.0.3'
```

### Gemfile.lock
空ファイルを作成
```
```
`Gemfile.lock`は直接編集するファイルではなく、`bundle install`実行時に勝手に更新されるファイル。  
`Gemfile.lock`が存在する場合は、このファイルに基づいてGEMがインストールされる。  

### entrypoint.sh
[公式Dockerのサイト](https://docs.docker.com/samples/rails/)に以下のように書いています。  
> provide an entrypoint script to fix a Rails-specific issue that prevents the server from restarting when a certain server.pid file pre-exists. This script will be executed every time the container gets started.

つまり、特定のpidが残っているとエラーになるので削除するようです。  
```
#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /rails_app/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
```

## Railsプロジェクトを作成
### プロジェクト作成
```
docker-compose run web rails new . --force --no-deps --database=mysql --skip-test --webpacker
```
- `--force`: Gemfileを上書き
- `--no-deps`: リンクしたサービスを立ち上げない
- `--database=mysql`: dbはMySQLを使用する
- `--skip-test`: testは作成しない
- `--webpacker`: webpackerをインストールする

### コンテナをビルド
```
docker-compose build
```
Gemfileが更新されているので、再ビルドする。  

### データベースの修正
config/database.ymlの内容を以下で上書きします。  
```
default: &default
  adapter: mysql2
  encoding: utf8mb4
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  username: root
  password:
  host: localhost

development:
  <<: *default
  database: myapp_development
  host: db
  username: root
  password: password

test:
  <<: *default
  database: myapp_test
  host: db
  username: root
  password: password
```

### DB作成
```
docker-compose run web rails db:create
```
DBを作成する。  

### コンテナを起動
```
docker-compose up -d
```
コンテナをバックグラウンドで起動する。  

## 参考
- [Ruby on Railsの開発環境をDockerで構築する方法(Rails 6.x)](https://zenn.dev/tmasuyama1114/articles/rails-docker-6x-how-to)
- [Quickstart: Compose and Rails](https://docs.docker.com/samples/rails/)