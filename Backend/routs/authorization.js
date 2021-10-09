const Router = require('@koa/router');
const router = new Router();

router.post("/sign_in", async ctx => {
    if (!ctx.request.body.login || !ctx.request.body.password) {
        ctx.throw(400, "Не достаточно данных");
    }
    const token = await dbProvider.user.updateSessionToken(ctx.request.body.login, ctx.request.body.password);
    if (token) {
        ctx.body = token;
    } else {
        ctx.throw(400, "Не верные данные")
    }
})

router.post("/registration", async ctx => {
    try {
        const {login, pass, company} = ctx.request.body
        if (await dbProvider.user.getByLogin(login)) {
            ctx.throw(400, "Не верные данные")
        }
        await dbProvider.user.addUser(login, pass, company)
        const token = await dbProvider.user.updateSessionToken(login, pass);
        if (token) {
            ctx.body = token;
        } else {
            ctx.throw(400, "Не верные данные")
        }
    } catch (e) {
        ctx.throw(e)
    }

})

module.exports = router
