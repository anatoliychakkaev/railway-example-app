# Welcome to Railway Example App

## before start

make sure redis server is started OR change `config/database.js` to use another driver. please note, sql drivers require command `railway db migrate` to create database and appropriated tables, make sure to run in before `railway seed` command.

## to get started

```
git clone git://github.com/anatoliychakkaev/railway-example-app.git lib-app
cd lib-app
npm install -l
railway seed
node server.js
```


