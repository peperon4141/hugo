var data = [
{
url: "https://tech.choihack.com/post/wordpress/mysql%E3%82%92%E8%A6%97%E3%81%84%E3%81%A6%E3%81%BF%E3%82%8B/",
title: "MySQLを覗いてみる",
date: "2021-07-29T19:08:24+09:00",
body: "MySQLを覗いてみる はじめに 前回の Dockerを使ってwordpress環境を瞬作 という投稿で、WordPressを立ち上げました。 今回は立ち上げたことを前提として、MySQLファイルを覗いていきましょう。 MySQLにログインする まずは、MySQLのDockerコンテナ内に入ります。 docker exec -it mysql bash 入った後、MySQLにログインします。 mysql -u wp_user -ppassword -u: ユーザー名 -p: パスワード データベースの一覧 $ show databases; +--------------------+ | Database | +--------------------+ | information_schema | | wordpress | +--------------------+ 2 rows in set (0.10 sec) wordpressという名前のデータベースがあることがわかります。 テーブル一覧 use wordpress; でデータベースを指定できます。 テーブル一覧を見てみましょう。 $ show tables; +-----------------------+ | Tables_in_wordpress | +-----------------------+ | wp_commentmeta | | wp_comments | | wp_links | | wp_options | | wp_postmeta | | wp_posts | | wp_term_relationships | | wp_term_taxonomy | | wp_termmeta | | wp_terms | | wp_usermeta | | wp_users | +-----------------------+ 12 rows in set (0.00 sec) show table status;: このコマンドでより詳細を見ることができます。 ユーザーを確認する 例として、ユーザーテーブルを見てみましょう。 $ select * from wp_users; +----+------------+------------------------------------+---------------+-----------------------+-----------------------+---------------------+---------------------+-------------+--------------+ | ID | user_login | user_pass | user_nicename | user_email | user_url | user_registered | user_activation_key | user_status | display_name | +----+------------+------------------------------------+---------------+-----------------------+-----------------------+---------------------+---------------------+-------------+--------------+ | 1 | admin | $P$BIGZ1.I.CRyv4EbxMZ1Jpt/iQNSEWV/ | admin | example@gmail.com | http://localhost:8080 | 2021-07-29 11:32:15 | | 0 | admin | +----+------------+------------------------------------+---------------+-----------------------+-----------------------+---------------------+---------------------+-------------+--------------+ 1 row in set (0.00 sec)"
},
{
url: "https://tech.choihack.com/post/wordpress/",
title: "",
date: "2021-07-29T19:08:24+09:00",
body: ""
},
{
url: "https://tech.choihack.com/post/wordpress/docker%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6wordpress%E7%92%B0%E5%A2%83%E3%82%92%E7%9E%AC%E4%BD%9C/",
title: "Dockerを使ってWordPress環境を瞬作",
date: "2021-07-29T19:07:24+09:00",
body: "Dockerを使ってWordPress環境を瞬作 はじめに 色んな技術を勉強する時に、一番厄介なのが環境構築です。 失敗しても捨ててすぐに作りなおせるような環境があれば、勉強が捗りますよね？ そこでdockerを使ってWordPress環境を構築できるようにしました。 docker-composeで一瞬で環境構築 version: '3' services: wp: container_name: wordpress # 名前を付ける image: wordpress:5.4-php7.4-apache # 基となるdockerイメージを設定 ports: # docker内の80ポートを8080ポートとして使用 - 8080:80 depends_on: # dbを待ってから立ち上げる - db environment: # 環境変数を設定する WORDPRESS_DB_HOST: mysql:3306 # mysqlサーバーの3306ポートを指定 WORDPRESS_DB_PASSWORD: password # データベースのパスワード WORDPRESS_DB_NAME: wordpress # データベースの名前 WORDPRESS_DB_USER: wp_user # データベースのユーザー名 volumes: # ホストPCにボリュームをマウントする - ./apache/log:/var/log/apache2 - ./public:/var/www/html db: container_name: mysql image: mysql:5.7 environment: # WordPressの方で指定した設定と同じにしておく必要がある MYSQL_ROOT_PASSWORD: password MYSQL_DATABASE: wordpress MYSQL_USER: wp_user MYSQL_PASSWORD: password volumes: - ./mysql:/var/lib/mysql docker-compose.ymlというファイルを作成し、上記を書きます。 あとは以下のコマンドを実行します。 docker-compose up -d: オプションでバックグラウンドで実行 http://localhost:8080/ にアクセスすると、WordPressの設定画面が確認できます。 あとは画面に従って操作するだけです。 WordPressの階層を変える wp: の下の階層に working_dir: /var/www/html/WordPress を追加できます。 こうすることで、WordPressディレクトリ以下を基本としてWordPressを起動します。 この設定で、サブディレクトリにWordPressがある場合にも対応できます。 voluems volumes: - ./apache/log:/var/log/apache2 - ./public:/var/www/html この設定でホストPCにDocker内のファイルをマウントできます。 ./apache/log:/var/log/apache2の設定で、WordPressのログが確認できます。 ./public:/var/www/htmlの設定で、WordPressの中身を確認できます。 その他コマンド 終了 終了するには Ctrl + Cです。 停止中のコンテナが邪魔な場合は以下で消すことができます。 docker-compose rm -sf -f, --force: オプションで確認なしで実行 -s, --stop: 必要なら削除前にコンテナを停止する コンテナの中に入る WordPressのDockerコンテナに入るには以下のコマンドです。 docker exec -it wordpress bash 起動中コンテナの確認 docker ps -a, --all: 停止中のコンテナを含めて表示する"
},
{
url: "https://tech.choihack.com/post/wordpress/wordpress%E3%81%AE%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E6%A7%8B%E6%88%90%E3%82%92%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B/",
title: "WordPressのファイル構成を理解する",
date: "2021-07-29T19:07:24+09:00",
body: "WordPressのファイル構成を理解する はじめに 前回の Dockerを使ってwordpress環境を瞬作 という投稿で、WordPressを立ち上げました。 今回はファイル構成の詳細を見ていきましょう。 ファイル構成 . ├── wp-admin # 管理画面に関するファイル ├── wp-content │ ├── languages │ ├── plugins # プラグインが格納されるディレクトリ │ ├── themes # テーマが格納されるディレクトリ │ └── upgrade └── wp-includes ├── index.php # WordPressが初めに通るファイル ├── wp-config.php # WordPressの設定が書かれているファイル ├── wp-config-sample.php # wp-config.phpの雛形ファイル ├── wp-login.php # ログイン画面のファイル ├── license.txt # ライセンスに関するファイル ├── readme.html # WordPressの概要に関するファイル └── .htaccess # Apacheの設定ファイル"
},
{
url: "https://tech.choihack.com/post/tradingview/series%E3%81%A8%E3%81%AF/",
title: "Seriesとは",
date: "2021-07-26T18:26:57+09:00",
body: "Seriesとは はじめに PineScriptを使用する上で、最も重要なのがSeriesの理解です。 Seriesは若干クセがあるので、しっかりと理解する必要があります。 Pineスクリプトの型システム Pineスクリプトには以下の基本的な9つの型が存在します。 int float bool color string line label plot hline これらの型はいくつかの形式で存在します。 形式には5種類あります。 literal const input simple series 型と形式は合わせて参照されます。 例えばliteral bool型、input bool型\u0026hellip;のようにコンパイラによって識別されます。 また、以下のような型も存在します。 array void na (not available) tuple type 形式 Literal Literalは固定された値を表すための特別な表記法です。 Literalは常に以下のどれかの型形式になります。 literal float (3.14, 6.02E-23, 3e8) literal int (42) literal bool (true, false) literal string (\u0026ldquo;A text literal\u0026rdquo;) literal color (#FF55C6) ビルトインのopen,high,low,\u0026hellip;などはLiterarlではありません。 これらはserires formです。 Const Const形式の値は次の特徴があります。 PineScript実行中に変更されない コンパイル時に確定されるか計算される 例えば c1 = 0 c2 = c1 + 1 c3 = c1 + 1 if open \u0026gt; close c3 := 0 c1はconst intです。 理由はliteral intによって初期化されるからです。 c2もconst intで、const intだけの計算で初期化されるからです。 c3はseries intで、理由は実行中に変更されるからです。 Input Inputは以下の特徴があります。 PineScript実行中に変更されない コンパイル時には未確定 input関数に基づいている 例えば p = input(10, title=\u0026quot;Period\u0026quot;) pはinput integerです。 Simple Simpleは以下の特徴があります。 PineScript実行中に変更されない コンパイル時に未確定 この値は、チャートのシンボルの情報に基づいています。 例えば、ビルトイン変数のsyminfo.mintickはsimple floatです。 simpleは省略されることもあるので、単にfloatと呼ばれることもあります。 Series Seriesは以下の特徴があります。 PineScript実行中に変更される メインチャートのシンボルの各バーに関連付けられた履歴の値を保存します []演算子を使用してアクセスできる seriesの最後（つまり最新のバー）に関連付けられている値のみが読み書き両方できる seriesはPineScriptで最も一般的な形式です。 ビルトインのseries変数は例えば、open、high、low、close、volume、timeなどです。 これらのseriesのサイズは現在のティッカーの時間枠で使用可能なバーの数と同じです。 Seriesには数値かna（not avairable：使用不可）が含まれる場合があります。 例えば a = open + close // 2つのSeriesの加算 b = high / 2 // integer literal const による、Seriesの除算 c = close[1] // 前のcloseの値の参照 参考 Series"
},
{
url: "https://tech.choihack.com/post/tradingview/",
title: "",
date: "2021-07-26T18:26:57+09:00",
body: ""
},
{
url: "https://tech.choihack.com/post/tradingview/%E3%83%9C%E3%83%83%E3%82%AF%E3%82%B9%E6%8F%8F%E7%94%BB%E6%A9%9F%E8%83%BD/",
title: "ボックス描画機能",
date: "2021-07-26T17:54:26+09:00",
body: "ボックス描画機能 はじめに PineScriptにボックス描画機能が追加されました。 この機能ではチャート上に長方形を簡単に書くことができます。 サンプルを踏まえて、PineScriptでの使い方を見ていきます。 サンプル //@version=4 study(\u0026quot;Box Example\u0026quot;, overlay=true) c_green = color.rgb(33, 150, 243, 80) ll = lowest(10) hh = highest(10) b1 = box(na) if barstate.islast b1 := box.new(bar_index[9], hh, bar_index, ll, bgcolor=c_green, border_style=line.style_dashed) box.delete(b1[1]) //@version=4 バージョン4のPineScriptを使用しています。 study(\u0026quot;Box Example\u0026quot;, overlay=true) Box Exampleという名前でインジケータを作成します。 overlay=trueでチャートを重ねて表示します。 c_green = color.rgb(33, 150, 243, 80) color.rgb(red, green, blue, transp)の文法で色を定義します。 各色は0~255,transpは0(不透明)~100(不可視)です。 ll = lowest(10) lowestは指定された過去バーの範囲での最安値を意味します。 この場合は過去10本のバーの中での最安値のことです。 hh = highest(10) lowestと逆で過去10本のバーの中で最高値を意味します。 b1 = box(na) ifが別のスコープを作成するので、再代入する元になるb1変数を先に空で定義しておきます。 if barstate.islast barstate.islastは現在のバーがバーセットの最後のバーの場合はtrueを返し、そうでない場合はfalseを返します。 b1 := box.new(bar_index[9], hh, bar_index, ll, bgcolor=c_green, border_style=line.style_dashed) b1に値を再代入します。（=は代入で、:=は再代入を表します） box.new(left, top, right, bottom, border_color, border_width, border_style, extend, xloc, bgcolor)で長方形を描画します。 box.delete(b1[1]) box.delete(id)で指定されたボックスを削除します。 このスクリプトを描画すると以下のようになります。 参考 新しい描画 — ボックス Trading Viewのエラー"
},
{
url: "https://tech.choihack.com/post/tradingview/pinescript%E5%85%A5%E9%96%80/",
title: "PineScript入門",
date: "2021-07-26T17:13:59+09:00",
body: "PineScript入門 はじめに PineScriptはトレードのインジケータを作成するための言語です。 独自の言語なので少し癖があります。 この記事では、 Quickstart guide で紹介されているインジケータを解説します。 対象のインジケータのコード //@version=4 study(\u0026quot;MACD\u0026quot;) fast = 12, slow = 26 fastMA = ema(close, fast) slowMA = ema(close, slow) macd = fastMA - slowMA signal = sma(macd, 9) plot(macd, color=color.blue) plot(signal, color=color.orange) Line 1: //@version=4 この行はコンパイラにスクリプトのバージョンを伝えるコメントです。 Line 2: study(\u0026quot;MACD\u0026quot;) MACDというチャートの名前を定義しています。 studyはインジケータ、strategyがEAを意味します。 Line 3: fast = 12, slow = 26 2つの変数を定義しています。 Line 4: fastMA = ema(close, fast) EMA(Exponential Moving Average)を計算した結果をfastMAに代入します。 ema はビルトイン関数です。 closeのシリーズを元に計算し、期間はfast（12）です。 Line 5: slowMA = ema(close, slow) 4行目と同じですが、期間はslow（26）で、slowMAに計算結果を代入します。 Line 6: macd = fastMA - slowMA fastMA と slowMA の差を求めmacd変数に代入します。 Line 7: signal = sma(macd, 9) macdを使って、SMA(Simple Moving Average)を計算し、signal変数に代入します。 Line 8: plot(macd, color=color.blue) macd変数を青線でプロットするため、plot関数を使用します。 Line 9: plot(signal, color=color.orange) signal変数をオレンジ線でプロットするため、plot関数を使用します。 MACDを実行すると次のようなチャートが見れます。 study と strategy strategyはバックテストの実行に使用されます。 studyの実行に比べて、strategyはstrategy.*()のような売り・買いの実行をブローカーエミュレーターに対してシミュレートします。 studyはバックテストには使用できず、ブローカーへの注文もしません。 その分少ないリソースで高速に実行できます。 Strategyはデフォルトでは、履歴バー毎に実行されますが、価格変更毎に実行することも可能です。 詳細： Execution model Series PineScirptで使用される主なデータ型はSeriesと呼ばれます。 これは現在から過去のバーに遡り、各バーに1つの値を持つ連続リストです。 これは他の言語で言うところの配列のようなものだと思われがちですが、そう考えるのはよくありません。 詳細： Series PineScriptの実行モデル PineScriptは他の一般的な一度実行されて止まって終わりの言語とは異なっています。 各履歴バー毎に一回だけ実行されます。 ただし、最新のリアルタイムバーの場合は、価格やボリュームの変更が検知されたタイミングで一度実行されます。 また、履歴バーが閉じたタイミングで一度実行されます。 参考 Pineスクリプト言語リファレンスマニュアル Pineスクリプト Pine Script 4 User Manual"
},
{
url: "https://tech.choihack.com/post/hugo/githubpages%E3%81%A8googledomain%E3%81%A7%E3%82%B5%E3%82%A4%E3%83%88%E3%82%92%E5%85%AC%E9%96%8B%E3%81%99%E3%82%8B/",
title: "GitHubPagesとGoogleDomainでサイトを公開する",
date: "2021-07-25T09:32:14+09:00",
body: "GitHubPagesとGoogleDomainでサイトを公開する はじめに GitHubPagesの利点は、いくつか制限があるものの以下のメリットがあります。 TLS対応（Let\u0026rsquo;s Encrypt) 独自ドメイン対応 無料 GoogleDomainでは１４００円のドメインを使用しています。 このドメインにサブドメインを追加することで、複数ドメインを追加料金なく使用しています。 なので、私はいくつかブログを運用していますが、年間合計１４００円しかかかっていません。 しかも、GitHubのActionsなど優秀な機能の恩恵を請けられるので、メンテナンスコストが非常に少なくなります。 GoogleDomainでドメイン取得 サブドメインを追加する方法を説明します。 GoogleDomainの管理画面から マイドメイン \u0026gt; 自分のドメイン \u0026gt; DNS \u0026gt; カスタムレコードを管理 すると、ドメインの設定をカスタマイズできるようになります。 新しいレコードを追加 し、以下のように入力します。 ホスト名： サブドメインにしたい文字列（別名とするサブドメインの指定） タイプ： CNAME（データで指定したホストに対して、別名を登録する方式） TTL：3600（1時間の有効期限） データ：XXXXXXX.github.io. （自身のGitHubのホスト） GitHubActionsを使ってHugoをビルドする ActionsのWorkflowに以下を登録します。 name: gh-pages on: push: branches: - master workflow_dispatch: jobs: build: runs-on: ubuntu-20.04 steps: - name: Checkout uses: actions/checkout@v2 with: submodules: true - name: Setup Hugo uses: peaceiris/actions-hugo@v2 with: hugo-version: '0.85.0' extended: true - name: Hugo build run: hugo --minify - name: Deploy uses: peaceiris/actions-gh-pages@v3 with: github_token: ${{ secrets.GITHUB_TOKEN }} publish_dir: ./public このWorkflowの概要としては、 masterブランチが変更された場合に動作する サブモジュールがあれば読み込む Hugoの0.85.0を拡張付きでインストールする（SASSなどを使用する場合は拡張が必要） publicディレクトリを公開する ビルド実行前に/static/CNAME内に、GoogleDomainで指定したDomainを記載します。 そうすることで、GitHubPagesの独自ドメインに反映されます。 GitHubPagesの設定 以下の設定は反映に時間がかかる場合があるので、動作しなければしばらく待ってみましょう。 Sourceの設定 GitHubActionsのビルドが完了すると、gh-pagesというブランチにHugoのビルド結果が作られているはずです。 Settings \u0026gt; Pagesでsourceにgh-pagesを選択し、rootを選びましょう。 Custom domain /static/CNAMEが適切に設定されていると、Custom domainは勝手に設定されているはずです。 GitHubPagesからCustom domainを設定した場合、自動でCNAMEが設定されます。 ただし、このファイルはHugoをビルドしたブランチには反映されないため、staticディレクトリ以下に配置する必要があります。 Enforce HTTPS チェックを付けるとHTTPSで公開してくれます。"
},
{
url: "https://tech.choihack.com/post/hugo/",
title: "",
date: "2021-07-25T09:32:14+09:00",
body: ""
},
{
url: "https://tech.choihack.com/post/hugo/shortcode/",
title: "ShortcodeでAmazonのリンクを作成する",
date: "2021-07-25T09:16:54+09:00",
body: "ShortcodeでAmazonのリンクを作成する はじめに Hugoでブログを書いていて、頻出するようなHTMLを自動で簡単に出力できるようにしたいと思いました。 そこで使用できるのがShortcodeの機能です。 今回はAmazonのアフィリエイトリンクを作成するためのShortcodeを作成します。 Shortcodeの基本 Shortcodeは、事前に定義した小さな処理を呼び出すための仕組みです。 ここでは書き方を整理します。 /layouts/shortcodes/以下にSHORTCODE.htmlをファイルを作成すると SHORTCODEがショートコード名になる Shortcodeを呼び出す場合は {{\u0026lt; ショートコード名 \u0026quot;値\u0026quot; \u0026gt;}} {{\u0026lt; ショートコード名 パラメータ名=\u0026quot;値\u0026quot; \u0026gt;}} パラメータを取り出す場合は {{ .Get 0 }}（0はパラメータのインデックス） {{ .Get パラメータ名 }} 間に文字を挟み込める {{\u0026lt; highlight go \u0026gt;}} A bunch of code here {{\u0026lt; /highlight \u0026gt;}} 挟み込んだ文字を取り出す場合は {{ .Inner }} 挟み込んだ文字は書き方によって処理のされ方が異なる {{\u0026lt; \u0026gt;}} -\u0026gt; HTML {{% %}} -\u0026gt; Markdown Built-inショートコードが存在する。 Figure Youtube Tweet Instagram etc. ShortcodeのサンプルをMarkdownで表示したい場合は {{\u0026lt;/* shortcode */\u0026gt;}} Amazonのショートコードを作成 サンプルにAmazonのアフィリエイトリンク用のショートコードを作成します。 /layouts/shortcodes/amazon.htmlというファイルを作成しました。 中身は {{- $tag := .Site.Params.amazonTrackingId }} {{- $asin := .Get \u0026quot;asin\u0026quot; -}} {{- $title := .Get \u0026quot;title\u0026quot; -}} \u0026lt;div class=\u0026quot;amazon\u0026quot;\u0026gt; \u0026lt;a target=\u0026quot;_blank\u0026quot; href=\u0026quot;https://www.amazon.co.jp/dp/{{ $asin }}/ref=nosim?tag={{ $tag }}\u0026quot;\u0026gt; \u0026lt;img class=\u0026quot;amazon-img\u0026quot; src=\u0026quot;//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8\u0026amp;MarketPlace=JP\u0026amp;ASIN={{ $asin }}\u0026amp;ServiceVersion=20070822\u0026amp;ID=AsinImage\u0026amp;WS=1\u0026amp;Format=_SL350_\u0026amp;tag={{ $tag }}\u0026quot; /\u0026gt; \u0026lt;p class=\u0026quot;amazon-title\u0026quot;\u0026gt;{{ $title }}\u0026lt;/p\u0026gt; \u0026lt;/a\u0026gt; \u0026lt;/div\u0026gt; Amazonのリンクに関しては Amazon.co.jpの特定の商品へのシンプルなテキストリンクはどのように作ればよいですか。 を参考にしています。 呼び出し方は {{\u0026lt; amazon asin=\u0026quot;123456789\u0026quot; title=\u0026quot;商品名\u0026quot; \u0026gt;}} config.tomlに以下のように自身のトラッキングIDを設定してください。 [Params] amazonTrackingId = \u0026quot;あなたのトラッキングID\u0026quot; Amazonの商品ページからShortcode作成 補足として、Amazonの商品ページからShortcodeを自動生成する方法を記載しておきます。 以下をBookmarkletとして登録しておきます。 javascript:(function(){var asin=document.URL.match(/\\/dp\\/(.{10})/)[1], title=document.getElementById(\u0026quot;productTitle\u0026quot;).textContent.trim(); alert(`{{\u0026lt; amazon asin=\u0026quot;${asin}\u0026quot; title=\u0026quot;${title}\u0026quot; \u0026gt;}}`);})(); 参考 Shortcodes"
},
{
url: "https://tech.choihack.com/post/git_submodule%E3%82%92%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B/",
title: "Git submoduleを理解する",
date: "2021-07-20T07:32:10+09:00",
body: "Git submoduleを理解する はじめに Git submoduleとは外部のGitリポジトリを、自分のリポジトリのサブディレクトリとして登録する仕組みです。 コマンドの使い方 頻出するコマンドをまとめます。 今回はサンプルとして、MainroadというHugoのテーマを使います。 ローカルワークスペースのthemes/mainroadディレクトリ以下に追加していきます。 追加 git submodule add \u0026lt;リポジトリのURL\u0026gt; \u0026lt;ローカルのサブディレクトリ\u0026gt; git submodule add https://github.com/Vimux/Mainroad.git themes/mainroad themes/mainroad以下にmainroadがクローンされます。 更新 git submodule update 削除 git submodule deinit -f \u0026lt;サブモジュール\u0026gt;: s git rm -f \u0026lt;サブモジュール\u0026gt;: gitの管理から削除 rm -rf .git/modules/\u0026lt;サブモジュール\u0026gt;: .gitからgit情報を削除 git submodule deinit themes/mainroad git rm -f themes/mainroad rm -rf .git/modules/themes/mainroad submoduleを追加したときに起こっていること submoduleを理解するために、どんなことが起こっているのかを整理しておきましょう。 追加されたファイルを確認 $ git status On branch master Changes to be committed: (use \u0026quot;git restore --staged \u0026lt;file\u0026gt;...\u0026quot; to unstage) new file: .gitmodules new file: themes/mainroad .gitmodulesファイルとthemes/mainroadディレクトリが追加されていることがわかります。 .gitmodulesファイルの中身 .gitmodulesの中身は以下のようになっています。 [submodule \u0026quot;themes/mainroad\u0026quot;] path = themes/mainroad url = https://github.com/Vimux/Mainroad.git path: ローカルのパス url: submoduleとして読み込んだリポジトリのURL .gitディレクトリ内への情報の追加 通常Gitを使っていると、.gitディレクトリが追加され、中にはcommitやconfigなどの情報が保存されます。 submoduleの場合は、modules以下に同様の情報が追加されます。 今回のサンプルの場合は、.git/modules/mainroadディレクトリに情報が追加されます。 差分チェック $ git diff --cached diff --git a/.gitmodules b/.gitmodules new file mode 100644 index 0000000..537ffba --- /dev/null +++ b/.gitmodules @@ -0,0 +1,3 @@ +[submodule \u0026quot;themes/mainroad\u0026quot;] + path = themes/mainroad + url = https://github.com/Vimux/Mainroad.git diff --git a/themes/mainroad b/themes/mainroad new file mode 160000 index 0000000..043befb --- /dev/null +++ b/themes/mainroad @@ -0,0 +1 @@ +Subproject commit 043befbc585e5a1d7859cfd1f1700d9a5a09cca8 Subproject commit 043befbc585e5a1d7859cfd1f1700d9a5a09cca8が重要です。 mainroadの043befbc585e5a1d7859cfd1f1700d9a5a09cca8コミットを themes/mainroadディレクトリにsubdmouleとして登録した という意味です。 さいごに 参照: Git submodule の基礎"
},
{
url: "https://tech.choihack.com/post/gas/",
title: "",
date: "2021-07-19T08:45:56+09:00",
body: ""
},
{
url: "https://tech.choihack.com/post/gas/gas%E3%81%A7linebot%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95/",
title: "GASでLINEBotを作成する方法",
date: "2021-07-19T08:45:56+09:00",
body: "GASでLINEBotを作成する方法 はじめに いい家計簿アプリが見つからなかったので、GASを使って家計簿アプリを作成してみました。 この記事では全ての手順は解説せず、注意点だけを備忘録的に記載します。 LINEの設定 LINE Developersアカウントを作成 以下からアカウントを作成する。 https://developers.line.biz/ja/ プロバイダー作成 LINE Developersの画面から、プロバイダーを作成する。 プロバイダーとはサービスを提供する組織や個人のこと。 Webhookの利用を有効化 Webhookの利用が初期状態では無効なので有効化する。 GASのウェブアプリがデプロイ済みであれば、URLも設定して検証を行う。 グループ・複数人チャットへの参加を許可する PUSH_MESSAGEのAPIを利用する場合、そのLINEグループのGroupIDが必要となる。 LINEグループへBotを追加するには、Botが承認を有効にする必要があるので、「グループ・複数人チャットへの参加を許可する」を有効にしておく。 GASの設定 ログの設定 LINE Botを作成するに当たり、GASのdoPost関数を利用します。 しかし、doPostはログを確認できません。 正確に言うと、エディタから実行した場合はログが見れますが、外部から実行された場合そのログは確認できません。 外部から実行された場合でもログを確認するためには、Google Cloud Platform (GCP) と紐付ける必要があります。 裏技的に、スプレッドシートをログ代わりにすることも可能です。"
},
{
url: "https://tech.choihack.com/post/hugo/%E3%83%9A%E3%83%BC%E3%82%B8%E3%82%BB%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%AB%E3%83%86%E3%82%B4%E3%83%AA%E6%95%B0%E3%81%AE%E5%8F%96%E5%BE%97/",
title: "ページ・セクション・カテゴリ数の取得",
date: "2021-07-18T16:34:14+09:00",
body: "ページ・セクション・カテゴリ数の取得 はじめに Hugoでページのデータを取得する方法をまとめました。 取得方法 サイト内の全記事数 {{ len .Site.RegularPages }} サイト内の全ページ数 {{ len .Site.Pages }} ホームページから下層のページ、そして、カテゴリやタグページも含まれる。 現在の階層の記事数 {{ len .RegularPages }} 現在の階層のページ数 {{ len .Pages }} ページにはセクションページも含まれる。 現在の階層以下の全ての記事数 {{ len .RegularPagesRecursive }} ただし、listページでのみ使用できる。 現在の階層のセクション数を取得 {{ len .Sections }} サイト内の全カテゴリ数 {{ len .Site.Taxonomies.categories }} サイト内の全タグ数 {{ len .Site.Taxonomies.tags }}"
},
{
url: "https://tech.choihack.com/post/hugo/hugo%E3%81%A7%E3%83%86%E3%83%BC%E3%83%9E%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B%E5%89%8D%E3%81%AB%E6%8A%91%E3%81%88%E3%81%A6%E7%BD%AE%E3%81%8D%E3%81%9F%E3%81%84%E3%81%93%E3%81%A8/",
title: "Hugoでテーマ作成する前に抑えて置きたいこと",
date: "2021-07-14T00:04:43+09:00",
body: "Hugoでテーマ作成する前に抑えて置きたいこと はじめに 私はHugoでテーマを作成していますが、よく探さないと記載されていなかったり、あやふやなまま使っていた書き方がありました。 そこでそれらをまとめてみました。 Hugoのテンプレートのハイフンの有無 以下のように、{{}}内に-を書いていたり、いなかったりするテーマを見かけます。 \u0026lt;div\u0026gt; {{- .Title -}} \u0026lt;/div\u0026gt; この出力結果は以下です。 \u0026lt;div\u0026gt;Hello, World!\u0026lt;/div\u0026gt; \u0026lt;div\u0026gt; {{ .Title }} \u0026lt;/div\u0026gt; このようにハイフンがない場合は以下のようになります。 \u0026lt;div\u0026gt; Hello, World! \u0026lt;/div\u0026gt; なので、前後のwhitespaceが消えます。 Whitespace 参考 Introduction to Hugo Templating"
},
{
url: "https://tech.choihack.com/post/hugo/404%E3%83%9A%E3%83%BC%E3%82%B8%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B/",
title: "404ページを作成する",
date: "2021-07-13T23:51:01+09:00",
body: "404ページを作成する はじめに 404ステータスとは、ページが見つからない場合に返すステータスのことです。 Hugoでは存在しないページ用のHTMLも独自定義できます。 作成方法 /layouts/404.htmlにページを作成します。 {{ define \u0026quot;main\u0026quot;}} \u0026lt;main id=\u0026quot;main\u0026quot;\u0026gt; \u0026lt;div\u0026gt; \u0026lt;h1 id=\u0026quot;title\u0026quot;\u0026gt;\u0026lt;a href=\u0026quot;{{ \u0026quot;/\u0026quot; | relURL }}\u0026quot;\u0026gt;Go Home\u0026lt;/a\u0026gt;\u0026lt;/h1\u0026gt; \u0026lt;/div\u0026gt; \u0026lt;/main\u0026gt; {{ end }} 動作確認 http://localhost:1313/404.html にアクセスして確認します。 ローカルでの確認の注意点として、ローカルは上記のリンクを直接開く必要があります。 GitHubPagesなどのサービスを利用している場合は、存在しないURLにアクセスされた場合は、404.htmlにリダイレクトしてくれます。 参考 Custom 404 Page"
},
{
url: "https://tech.choihack.com/",
title: "",
date: "2021-07-11T23:23:10+09:00",
body: ""
},
{
url: "https://tech.choihack.com/post/",
title: "",
date: "2021-07-11T23:23:10+09:00",
body: ""
},
{
url: "https://tech.choihack.com/post/hugo/%E3%83%9A%E3%83%BC%E3%82%B8%E5%A4%89%E6%95%B0/",
title: "ページ変数",
date: "2021-07-11T18:32:36+09:00",
body: "ページ変数 はじめに ページ毎の変数は、 フロントマター で定義されるか、コンテンツのファイルの場所から生成されるか、コンテンツ本体から生成されます。 この記事では、ページレベル変数のリストの一部をまとめました。 ページ変数 多くの変数は、 フロントマター で定義されている変数です。 その中の一部を説明します。 .Kind: page、home、section、taxonomy、term、RSS、sitemap、robotsTXT、404などページの種類 .LinkTitle: ページのリンクを設定。設定されていれば、titleより優先的に使用される .Next: 次のregular page .Prev: 前のregular page .Site: Site Variables .Type: Content Types タイプが未設定ならcontent/\u0026lt;TYPE\u0026gt;のフォルダ名がタイプになる .Pages変数 regular pageはpostページかcontentページです。 一方、list pageはregular pageか他のlist pageを一覧化します。 （例: homepage、section page、taxonomy term page、taxonomypage） 記事をツリー状にした場合、末端がregular page、幹がlist pageです。 .Site.Pages: サイト内の全ページ。セクションやtaxonomyページも含む .Site.RegularPages: サイト内の全通常ページ 以下の変数は、現在のスコープだけを返します。 .Pages: 現在のページのスコープのregular pageとセクションページ。.Data.Pagesのエイリアスです。(第一階層のみ) .RegularPages: 現在のページのスコープのregular page。入れ子になっているものは除く .RegularPagesRecursive: 現在のページ以下の全てのregular page。入れ子になっているものを含む regular pageから.Pagesや.RegularPagesを使用しても、空が返ります。 セクション変数と関数 .Parent: ページのセクションや、セクションの親セクション .Section: 現在の記事が属するセクション .Sections: 現在の配下のセクション 参考 Page Variables"
},
{
url: "https://tech.choihack.com/post/hugo/%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%83%9E%E3%82%BF%E3%83%BC/",
title: "フロントマター",
date: "2021-07-11T17:06:18+09:00",
body: "フロントマター はじめに Hugoで記事を書く際に、各投稿の先頭に投稿の情報を記載できます。 この情報のことをフロントマター（FrontMatter）と言います。 フォーマット フロントマターはどんな記号で囲まれているかで、フォーマットの指定ができます。 TOML: +++ YAML: --- JSON: {} 中身はkeyvalueのペアで指定できます。 TOMLの場合はdate = \u0026quot;2021-07-11\u0026quot;のように=で繋ぎます。 定義済み変数 フロントマターには定義済み変数と独自定義変数が存在します。 定義済み変数の一部は以下のようになっています。 date: 投稿日付 description: コンテンツの説明 draft: trueなら下書き段階 images: 対象のページに関連する画像のパス配列。_internal/twitter_cards.htmlなどで使用される keywords: メタキーワード lastmod: 最終更新日付 linkTitle: コンテンツのリンク生成時に使用されるURL。Hugoはtitleの前にlinkTitleを使用する series: ページが属するシリーズ名 slug: 出力URLの末尾に表示される weight: 順番を並べ替える際に、小さいほど優先される 独自定義変数 include_toc = true このように定義した場合、.Params.include_tocで使用できます。 参考 Front Matter"
},
{
url: "https://tech.choihack.com/post/hugo/markdown%E3%81%A7class%E5%B1%9E%E6%80%A7%E3%82%84id%E5%B1%9E%E6%80%A7%E3%82%92%E4%BB%98%E3%81%91%E3%82%8B/",
title: "Markdownでclass属性やid属性を付ける",
date: "2021-07-11T14:01:14+09:00",
body: "Markdownでclass属性やid属性を付ける はじめに 通常Markdownで記載していると、独自のclass属性やid属性が指定できません。 ただし、だからと言って直接HTMLを記載するとMarkdownで書くというメリットが失われます。 Markdownで書きつつ、class属性やid属性を付ける方法を説明します。 markup.goldmark.parser.attribute 装飾したいMarkdown要素の後に{}で囲んだ属性リストを追加することで、独自の属性を追加できます。 この機能を使用するためにはconfig.tomlに以下の設定が必要です。 [markup.goldmark.parser.attribute] block = true ただし、この機能はv0.81.0からHugoに追加された機能です。 例えば以下のMarkdownを変換してみます。 この文章は警告です。 { .warn } \u0026lt;p class=\u0026quot;warn\u0026quot;\u0026gt;この文章は警告です。\u0026lt;/p\u0026gt; 参考 Configure Markup"
},
{
url: "https://tech.choihack.com/post/hugo/config.toml%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9/",
title: "config.tomlファイルの使い方",
date: "2021-07-11T12:45:54+09:00",
body: "config.tomlファイルの使い方 コンフィグファイルの種類 Hugoではいくつかのコンフィグファイルの種類が定義でき、好きな形式で書くことができます。 config.toml config.yaml config.json ここでは、TOML形式で定義したコンフィグファイルの説明を行います。 config.tomlファイルの読み方 TOMLとJSONファイルを変換できるサイトがあるので、一度確認すると意味がわかりやすいです。 TOML 参考にTOMLをJSONに変換したものを載せます。 TOML title = \u0026quot;TOML Example\u0026quot; [test] a = 1 [[table]] b = 2 [[table]] c = 3 [table3.inner] d = 4 [[table2.description]] e = 5 JSON { \u0026quot;title\u0026quot;: \u0026quot;TOML Example\u0026quot;, \u0026quot;test\u0026quot;: { \u0026quot;a\u0026quot;: 1 }, \u0026quot;table\u0026quot;: [ { \u0026quot;b\u0026quot;: 2 }, { \u0026quot;c\u0026quot;: 3 } ], \u0026quot;table3\u0026quot;: { \u0026quot;inner\u0026quot;: { \u0026quot;d\u0026quot;: 4 } }, \u0026quot;table2\u0026quot;: { \u0026quot;description\u0026quot;: [ { \u0026quot;e\u0026quot;: 5 } ] } } TOMLで[[\u0026lt;PARAM_NAME\u0026gt;]]のように2重の括弧で囲むと、配列として定義されることがわかります。 また、パラメータ名を.区切りにすることで階層構造を表現できます。 独自定義の変数 baseURL = \u0026quot;https://example.com/\u0026quot; languageCode = \u0026quot;ja-jp\u0026quot; title = \u0026quot;Hugoまとめ\u0026quot; [params] subtitle = \u0026quot;コツコツとHugoについてナレッジを記載します。\u0026quot; Hugoで独自変数をコンフィグファイルに記載する場合は、[params]の部分に記載します。 使用する場合は$.Site.Params.subtitleのように使います。 $を省略して、.Site.Params.subtitleとしたり、$.Site.Params.Subtitle変数名の頭文字を大文字にしても構いません。 参照 Configure Hugo Site Variables"
},
{
url: "https://tech.choihack.com/post/hugo/%E3%82%B5%E3%82%A4%E3%83%88%E4%BD%9C%E6%88%90/",
title: "サイト作成",
date: "2021-07-11T00:00:00Z",
body: "サイト作成 Hugoとは Hugoは静的サイトジェネレーターと呼ばれ、Markdown形式のコンテンツからHTMLを作成してくれます。 HugoはGoogle製のGo言語で作成されており、サイト作成の速度が非常に高速です。 この記事では、MacOSでの環境構築について説明します。 ローカルでサイト作成 Hugoインストール Homebrewを使用すると簡単にインストールできます。 $ brew install hugo 無事インストールが完了していると、以下のコマンドでバージョンが表示されるはずです。 $ hugo version Hugo Static Site Generator v0.79.0/extended darwin/amd64 BuildDate: unknown 新しいサイトの作成 $ hugo new site new_site_name このコマンドを実行することで、new_site_nameというフォルダー名で新しいサイトが作成できます。 テーマの追加 Hugoはテーマという仕組みで、簡単にサイトのデザインを使用できます。 テーマファイルは、themes/theme_nameディレクトリに保存されます。 git init(gitの初期化)を実行した後に以下を実行します。 git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke submodule addはgitのリポジトリ内に、子供のリポジトリを追加するコマンドです。 https://github.com/theNewDynamic/gohugo-theme-ananke.gitで定義されているHugoのテーマファイルを、ローカルのthemes/anankeディレクトリに保存しています。 submoduleとして追加しなくても、ダウンロードしてきたテーマファイルを配置しても構いません。 完了した後theme = \u0026quot;ananke\u0026quot;のようにconfig.tomlファイルに追加することでテーマを使用できます。 投稿の追加 投稿はcontent/\u0026lt;CATEGORY\u0026gt;/\u0026lt;FILE\u0026gt;.\u0026lt;FORMAT\u0026gt;という形式で保存します。 hugo new post/first-post.md と実行すると、content/post/first-post.mdに投稿んぼ雛形が追加されます。 --- title: \u0026quot;My First Post\u0026quot; date: 2019-03-26T08:47:11+01:00 draft: true --- 中にはこのような情報が記載されており、記事の詳細情報を定義することができます。 Hugoを起動する hugo server -D このコマンドで起動できます。 通常 http://localhost:1313/ にアクセスすると立ち上げたサーバーにアクセスできます。 ビルドする 以下のコマンドでサイトをビルドできます。 初期状態ではpublicディレクトリにサイトが作成されます。 hugo 参考 QuickStart"
},
{
url: "https://tech.choihack.com/categories/",
title: "Categories",
date: "0001-01-01T00:00:00Z",
body: "Categories"
},
{
url: "https://tech.choihack.com/tags/",
title: "Tags",
date: "0001-01-01T00:00:00Z",
body: "Tags"
},
{
url: "https://tech.choihack.com/post/varnish/",
title: "",
date: "0001-01-01T00:00:00Z",
body: ""
},
];