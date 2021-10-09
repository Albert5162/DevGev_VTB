const Koa = require('koa');
const cors = require('@koa/cors');
const koaRouter = require('@koa/router');
const koaBody = require('koa-bodyparser');
const serve = require('koa-static');
const graphqlHTTP = require('koa-graphql');
require('dotenv').config()
const query = require('./graphQL/shema');
const dataProvider = require('./dateProviders/DBProvider');
const authMiddleware = require('./lib/authMidlleware')();


const app = new Koa();
const router = new koaRouter();
const PORT = process.argv.find(value => "dev" === value) ? process.env.DEV_PORT : process.env.PORT;

//cors
app.use( (ctx, next) => {
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.set('Access-Control-Allow-Origin', '*');
    return next()
});
app.use(koaBody());
app.use(require('./routs/authorization').routes())
//Далее только авторизированые
app.use(authMiddleware);

(async function start_api() {
    global.dbProvider = await dataProvider()
    console.dir(dbProvider)
    let schema = await query();
    router.all('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true
    }));
})()
app.use(router.routes());

app.use(require('./routs/loadDataHub').routes());
app.use(require('./routs/showcase').routes());
app.listen(PORT, ()=> console.log("Запущен на порту ", PORT));
