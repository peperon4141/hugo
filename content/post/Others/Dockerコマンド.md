---
title: "Dockerコマンド"
date: 2021-08-01T17:17:17+09:00
linkTitle: "Dockerコマンド"
description: "Dockerコマンド"
---

## はじめに
Dockerを扱う場合、様々なコマンドが登場します。  
この投稿は、コマンドについて徒然とまとめる投稿です。  

## Docker基礎知識
Dockerの特徴と、よくある疑問をまとめます。  

### Infrastructure as Code
Dockerはインフラの状態をコードとして管理できます。  
Dockerfileはイメージの構成を定義します。  
docker-compose.ymlはコンテナの構成を定義します。  

テキストで構成を管理できるので、差分管理や共有が早く簡単になります。  

### DockerHubとは?
[Docker Hub](https://hub.docker.com/)はDocker社が管理するDockerイメージのレジストリ（保管場所）。
様々がDockerイメージが保存されており、ダウンロードして自分のコンテナ構成に組み込める。  

### Dockerのイメージとコンテナの違い
DockerコンテナとはDockerイメージのインスタンスのこと。  
イメージが設計図で、コンテナが実体。  
[Dockerのイメージとコンテナの違い](https://blog.codecamp.jp/programming-docker-image-container)

### VirtualBoxと何が違う？
Dockerは「コンテナ型仮想化」で、VirtualBoxは「ホスト型仮想化」。  
ホスト型仮想化が、ゲストOSをシミュレートするため、リソースを多く消費する。  
コンテナ型仮想化は、ホストOSから見ると単一プロセスで、ホストOSにカーネルを共有するため、消費リソースが少ない。  
[「Docker」を全く知らない人のために「Docker」の魅力を伝えるための「Docker」入門](https://qiita.com/bremen/items/4604f530fe25786240db)

## DockerHubの操作

### DockerHubにログイン
```
docker login [OPTIONS] [SERVER] [flags]
```
例: `docker login`

### イメージの検索
DockerHubからイメージを検索できる。  
```
docker search [OPTIONS] TERM
```

### イメージのダウンロード
```
docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```

### イメージのアップロード
```
docker push [OPTIONS] NAME[:TAG]
```

## ローカルのDockerイメージの操作
### イメージ一覧
ローカルのイメージ一覧を表示
```
docker images [OPTIONS] [REPOSITORY[:TAG]]
```
実行中コンテナを一覧。  

### イメージ詳細情報表示
```
docker inspect [OPTIONS] NAME|ID [NAME|ID...]
```
例：`docker inspect ruby:2.6.5`

### イメージにタグ付け
```
docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
```

### イメージの削除
```
docker rmi [OPTIONS] IMAGE [IMAGE...]
```

## Dockerコンテナの操作
### 稼働コンテナの一覧表示
```
docker ps [OPTIONS]
```
`-a`: 停止中コンテナも表示

`docker ps -a --format "{{.ID}}: {{.Status}}"` のように、出力形式をフォーマットできる。  
使用可能な変数は以下。  

| Placeholder |	Description |
| ---- | ---- |
| ID | Container ID |
| Image | Image ID |
| Command | Quoted command |
| CreatedAt | Time when the container was created. |
| RunningFor | Elapsed time since the container was started. |
| Ports | Exposed ports. |
| State | Container status (for example; “created”, “running”, “exited”). |
| Status | Container status with details about duration and health-status. |
| Size | Container disk size. |
| Names | Container names. |
| Labels | All labels assigned to the container. |
| Label | Value of a specific label for this container. |
| Mounts | Names of the volumes mounted in this container. |
| Networks | Names of the networks attached to this container. |

### コンテナの状況確認
コンテナのリアルタイムの状況を表示。  
```
docker stats [OPTIONS] [CONTAINER...]
```

### コンテナ実行
```
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```
例：  
  `docker run -d centos /bin/ping localhost`  
  コンテナのバックグラウンド起動。  

### コンテナ停止
```
docker stop [OPTIONS] CONTAINER [CONTAINER...]
```

### コンテナ再起動
```
docker restart [OPTIONS] CONTAINER [CONTAINER...]
```

### コンテナ削除
```
docker rm [OPTIONS] CONTAINER [CONTAINER...]
```
`-f`: コンテナが稼働していたら、停止して強制的に停止

### 稼働コンテナへコマンド実行
```
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```
例： `docker exec -it myimage /bin/bash`

### コンテナとホスト間のファイルコピー
```
docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-
docker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH
```

### volumeの一覧
```
docker volume ls [OPTIONS]
```

### volumeの削除
```
docker volume rm [OPTIONS] VOLUME [VOLUME...]
```

## 参考
- [Dockerコマンド一覧](https://qiita.com/nimusukeroku/items/72bc48a8569a954c7aa2)
