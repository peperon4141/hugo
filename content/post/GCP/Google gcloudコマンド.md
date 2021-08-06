---
title: "Google gcloudコマンド"
date: 2021-08-03T16:03:28+09:00
linkTitle: "Google gcloudコマンド"
description: "Google gcloudコマンド"
---

## はじめに
GCPを使うにあたって、gcloudコマンドは必須です。  
GCPのリソースを作成・管理するためのコマンドが含まれています。  
この記事では、コマンドの使用方法の概要を整理します。

## インストール
以下の手順でインストールできます。  
[インストール手順](https://cloud.google.com/sdk/docs/install)

インストールしなくてもCloudShellというGCPの画面直接gcloudコマンドが使用できます。  

## 初期設定系のコマンド
| コマンド | 説明 |
| ---- | ---- |
| gcloud init | gcloud ツールを初期化、承認、構成します。 |
| gcloud version | バージョンとインストールされているコンポーネントを表示します。 |
| gcloud components install | 特定のコンポーネントをインストールします。 |
| gcloud components update | Cloud SDK を最新バージョンに更新します。 |
| gcloud config set project | 作業するデフォルトの Google Cloud プロジェクトを設定します。 |
| gcloud info | 現在の gcloud ツール環境の詳細を表示します。 |

## 認証系
| コマンド | 説明 |
| ---- | ---- |
| gcloud auth login | Google ユーザー認証情報を使用して gcloud ツール用の Google Cloud アクセスを承認し、現在のアカウントをアクティブとして設定します。 |
| gcloud auth activate-service-account | gcloud auth login と同様ですが、サービス アカウントの認証情報を使用します。
| gcloud auth list | 認証情報が付与されているすべてのアカウントを一覧表示します。 |
| gcloud auth print-access-token | 現在のアカウントのアクセス トークンを表示します。
| gcloud auth revoke | アカウントのアクセス認証情報を削除します。 |

## コンテナ系
| コマンド | 説明 |
| ---- | ---- |
| gcloud auth configure-docker | gcloud ツールを Docker 認証ヘルパーとして登録します。 |
| gcloud container clusters create | GKE コンテナを実行するためのクラスタを作成します。 |
| gcloud container clusters list | GKE コンテナを実行するためのクラスタを一覧表示します。 |
| gcloud container clusters get-credentials | kubeconfig を更新して、kubectl で GKE クラスタを使用するようにします。 |
| gcloud container images list-tags | コンテナ イメージのタグとダイジェスト メタデータを一覧表示します。 |

## 参照
- [gcloud コマンドライン ツールのクイック リファレンス](https://cloud.google.com/sdk/docs/cheatsheet)
- [入門ガイド](https://cloud.google.com/sdk/docs/how-to)
- [gcloud コマンドライン ツールの概要](https://cloud.google.com/sdk/gcloud)