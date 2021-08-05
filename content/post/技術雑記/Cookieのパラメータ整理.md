---
title: "Cookieのパラメータ整理"
date: 2021-08-05T10:54:47+09:00
linkTitle: "Cookieのパラメータ整理"
description: "Cookieのパラメータ整理"
---

## はじめに
Cookieの設定をする時に、意外と色々パラメータがあります。  
何度も調べては忘れるので、ここでわかりやすくまとめて調べるのは最後にしたいと思います。  

## パラメータの種類
GoogleChromeのDeveloperToolで調べると、以下のパラメータがあります。  
- Name
- Value
- Domain
- Path
- Expires/Max-Age
- Size
- HttpOnly
- Secure
- SameSite
- Sameparty
- Priority
これらを対象にそれぞれのパラメータの意味と、設定される値について見ていきます。

### Name/Value
早速説明を省きます。  
Cookie名とCookieの値です。  

### Expires/Max-Age
Cookieの有効期限です。  
指定しない場合は、セッション終了までです。  
Max-Ageの単位は秒です。

### Domain
どのホストの場合にCookieを送信するかを指定します。  
デフォルトはCookieを保存したページのホストと同じページにアクセスした場合だけCookieを送信します。  

例えば、example.com/page.htmlにアクセスした時に保存されたCookieは、同じくexample.com のホストのページにアクセスした場合に送信されます。  
この時、`サブドメインへアクセスしてもCookieは送信されません`。

あえてDomainを指定し場合は、サブドメインを含めてCookieを送信できます。  
Domainの設定は以下のように行います。  
```javascript:JavaScriptの例
document.cookie = 'A=B; Domain=example.com';
```

### Path
PathはどのパスでCookieを送信するかを許可します。  

### Secure
Httpsの通信でのみ使用できる。  

```javascript:JavaScriptの例
document.cookie = 'A=B; Secure';
```

### HttpOnly
- JavaScriptで生成されたCookieはこのフラグを含むことができない
- フラグを含む場合は、JavaScriptで取得もできない

```javascript:JavaScriptの例
document.cookie = 'A=B; HttpOnly';
```

HttpとかHttpsとかに関連するCookieかと思うような名前ですが、Httpリクエスト経由でしか使用できないという意味のようですね。  

### SameSite
別サイトに遷移する時に、遷移先サイトのCookieを送信するかどうかを設定できます。  
設定可能な値は、以下のStrict、Lax、Noneの3つです。  

遷移元をAサイト、遷移先をBサイトとしましょう。  
AサイトからBサイトへ遷移する時、BサイトのCookieが送信されるか設定によって以下のようになります。  
- Strict：BサイトのCookieを送信しない
- Lax：GETやHEADなど、安全なメソッドの場合だけ送信する
- None：制限なくBサイトのCookieを送信する

Chromeでは、SameSiteが設定されていない場合は、Lax扱いになります。  
また、Noneを指定する場合は、同時にSecrue属性が必須です。  
つまり、制限なく別サイトにCookieを送信するには、HTTPS通信でないといけないということになります。  
{ .info }

## 参考
- [Cookieで指定可能な属性の種類と設定方法](https://www.javadrive.jp/javascript/webpage/index18.html)