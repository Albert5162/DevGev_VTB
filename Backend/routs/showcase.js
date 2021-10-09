const Router = require('@koa/router');
const router = new Router();

router.get("/showcase", async ctx => {
    ctx.body = await dbProvider.meta_datasets.getShowcase()
});

router.get("/showcase/:urn", async ctx => {
    ctx.body = await dbProvider.meta_datasets.getByURN(ctx.params.urn)
});
module.exports = router
