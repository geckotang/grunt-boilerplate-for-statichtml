# gruntfile boilerplate for static html

```zsh
bundle install --without=production --path vendor/bundle
sudo npm install
grunt
```

```zsh
cd htdocs
sleep 1 && open "http://localhost:8000/" & python -m SimpleHTTPServer
```

