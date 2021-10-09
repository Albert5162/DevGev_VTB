const Router = require('@koa/router');
const router = new Router();

router.get("/showcase", async ctx => {
    ctx.body = await dbProvider.meta_datasets.getShowcase()
})

module.exports = router
