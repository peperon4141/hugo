

var data = [
  {
    url: "https://tech.choihack.com/post/git_submodule%E3%82%92%E7%90%86%E8%A7%A3%E3%81%99%E3%82%8B/",
    title: "Git submoduleを理解する",
    date: "2021-07-20T07:32:10+09:00",
    body: "Git submoduleを理解する はじめに Git submoduleとは外部のGitリポジトリを、自分のリポジトリのサブディレクトリとして登録する仕組みです。 コマンドの使い方 頻出するコマンドをまとめます。 今回はサンプルとして、MainroadというHugoのテーマを使います。 ローカルワークスペースのthemes/mainroadディレクトリ以下に追加していきます。 追加 git submodule add \u0026lt;リポジトリのURL\u0026gt; \u0026lt;ローカルのサブディレクトリ\u0026gt; git submodule add https://github.com/Vimux/Mainroad.git themes/mainroad themes/mainroad以下にmainroadがクローンされます。 更新 git submodule update 削除 git submodule deinit -f \u0026lt;サブモジュール\u0026gt;: s git rm -f \u0026lt;サブモジュール\u0026gt;: gitの管理から削除 rm -rf .git/modules/\u0026lt;サブモジュール\u0026gt;: .gitからgit情報を削除 git submodule deinit themes/mainroad git rm -f themes/mainroad rm -rf .git/modules/themes/mainroad submoduleを追加したときに起こっていること submoduleを理解するために、どんなことが起こっているのかを整理しておきましょう。 追加されたファイルを確認 $ git status 8:18:14 ☁ master ☂ ✚ ✭ On branch master Changes to be committed: (use \u0026quot;git restore --staged \u0026lt;file\u0026gt;...\u0026quot; to unstage) new file: .gitmodules new file: themes/mainroad .gitmodulesファイルとthemes/mainroadディレクトリが追加されていることがわかります。 .gitmodulesファイルの中身 .gitmodulesの中身は以下のようになっています。 [submodule \u0026quot;themes/mainroad\u0026quot;] path = themes/mainroad url = https://github.com/Vimux/Mainroad.git path: ローカルのパス url: submoduleとして読み込んだリポジトリのURL .gitディレクトリ内への情報の追加 通常Gitを使っていると、.gitディレクトリが追加され、中にはcommitやconfigなどの情報が保存されます。 submoduleの場合は、modules以下に同様の情報が追加されます。 今回のサンプルの場合は、.git/modules/mainroadディレクトリに情報が追加されます。 差分チェック $ git diff --cached 8:18:29 ☁ master ☂ ✚ ✭ diff --git a/.gitmodules b/.gitmodules new file mode 100644 index 0000000..537ffba --- /dev/null +++ b/.gitmodules @@ -0,0 +1,3 @@ +[submodule \u0026quot;themes/mainroad\u0026quot;] + path = themes/mainroad + url = https://github.com/Vimux/Mainroad.git diff --git a/themes/mainroad b/themes/mainroad new file mode 160000 index 0000000..043befb --- /dev/null +++ b/themes/mainroad @@ -0,0 +1 @@ +Subproject commit 043befbc585e5a1d7859cfd1f1700d9a5a09cca8 Subproject commit 043befbc585e5a1d7859cfd1f1700d9a5a09cca8が重要です。 mainroadの043befbc585e5a1d7859cfd1f1700d9a5a09cca8コミットを themes/mainroadディレクトリにsubdmouleとして登録した という意味です。 さいごに 参照: Git submodule の基礎"
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
    url: "https://tech.choihack.com/post/gas/",
    title: "",
    date: "2021-07-11T23:23:10+09:00",
    body: ""
  },
  {
    url: "https://tech.choihack.com/post/hugo/",
    title: "",
    date: "2021-07-11T23:23:10+09:00",
    body: ""
  },
  {
    url: "https://tech.choihack.com/",
    title: "",
    date: "2021-07-11T23:23:10+09:00",
    body: ""
  },
  {
    url: "https://tech.choihack.com/post/varnish/",
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
    url: "https://tech.choihack.com/search/",
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
    body: "サイト作成 Hugoとは Hugoは静的サイトジェネレーターと呼ばれ、Markdown形式のコンテンツからHTMLを作成してくれます。 HugoはGoogle製のGo言語で作成されており、サイト作成の速度が非常に高速です。 この記事では、MacOSでの環境構築について説明します。 Hugoインストール Homebrewを使用すると簡単にインストールできます。 $ brew install hugo 無事インストールが完了していると、以下のコマンドでバージョンが表示されるはずです。 $ hugo version Hugo Static Site Generator v0.79.0/extended darwin/amd64 BuildDate: unknown 新しいサイトの作成 $ hugo new site new_site_name このコマンドを実行することで、new_site_nameというフォルダー名で新しいサイトが作成できます。 テーマの追加 Hugoはテーマという仕組みで、簡単にサイトのデザインを使用できます。 テーマファイルは、themes/theme_nameディレクトリに保存されます。 git init(gitの初期化)を実行した後に以下を実行します。 git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke submodule addはgitのリポジトリ内に、子供のリポジトリを追加するコマンドです。 https://github.com/theNewDynamic/gohugo-theme-ananke.gitで定義されているHugoのテーマファイルを、ローカルのthemes/anankeディレクトリに保存しています。 submoduleとして追加しなくても、ダウンロードしてきたテーマファイルを配置しても構いません。 完了した後theme = \u0026quot;ananke\u0026quot;のようにconfig.tomlファイルに追加することでテーマを使用できます。 投稿の追加 投稿はcontent/\u0026lt;CATEGORY\u0026gt;/\u0026lt;FILE\u0026gt;.\u0026lt;FORMAT\u0026gt;という形式で保存します。 hugo new post/first-post.md と実行すると、content/post/first-post.mdに投稿んぼ雛形が追加されます。 --- title: \u0026quot;My First Post\u0026quot; date: 2019-03-26T08:47:11+01:00 draft: true --- 中にはこのような情報が記載されており、記事の詳細情報を定義することができます。 Hugoを起動する hugo server -D このコマンドで起動できます。 通常 http://localhost:1313/ にアクセスすると立ち上げたサーバーにアクセスできます。 ビルドする 以下のコマンドでサイトをビルドできます。 初期状態ではpublicディレクトリにサイトが作成されます。 hugo 参考 QuickStart"
  },
  {
    url: "https://tech.choihack.com/search/data.js",
    title: "",
    date: "0001-01-01T00:00:00Z",
    body: ""
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
];