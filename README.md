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

## to get started with MongoDB and MongoHQ

```
git clone git://github.com/anatoliychakkaev/railway-example-app.git lib-app
cd lib-app
npm install -l
npm install mongodb
npm install mongoose
```

Then modify 'database.json' as follows;

```
{ "development":
{
   "driver":   "mongoose",
   "url":      "mongodb://<user>:<pass>@<server>.mongohq.com:<port>/<db_name>"
}, "test":
  { "driver":   "memory"
  }
}
```
(replace all entires with <abc> ecapsulation)
MongoHQ provides all the details in regard to connection string.

Now finally run
```
node server.js
```

Nested resources in action!!

