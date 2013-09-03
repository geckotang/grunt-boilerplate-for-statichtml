# gruntfile boilerplate for static html

## Setup

``` sh
bundle install --without=production --path vendor/bundle
sudo npm install
```

## CSSとJSの変更を監視してscssやconcatなどをする

``` sh
grunt
```

## CSSのみ生成する場合

### 非圧縮版

``` sh
grunt build_css
```

### 圧縮版

``` sh
grunt build_mincss
```

## スタイルガイドのみ生成する場合

grunt-styleguideでスタイルガイドを作成した際に、

うまいこと更新されない場合があるので一旦ガイドのディレクトリをcleanしている。

``` sh
grunt build_guide
```

## 最終的な状態を作る(?)

圧縮されたSCSS/JS,スタイルガイドを作成する。

``` sh
grunt build
```

## メモ

pythonを使って簡単なサーバーを立ち上げる。

``` sh
cd htdocs
sleep 1 && open "http://localhost:8000/" & python -m SimpleHTTPServer
```

