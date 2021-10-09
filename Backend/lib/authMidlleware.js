const passport = require('./passportConfig');

module.exports = (isOn = true) =>
    (ctx, next) => {
        return passport.authenticate('bearer', { session: false }, async (err, user) => {
            // if (!isOn) {
            //     ctx.state.user = await dbProvider.Manager.createSession(
            //         await dbProvider.Manager.updateSessionToken("HR", "123456789")
            //     )
            //     console.log(new Date(), "User -- ", ctx.state.user)
            //     return next()
            // }
            if (err) {
                ctx.throw(500, "Ошибка сервера во время авторизации")
            }
            if (!user) {
                ctx.throw(401, "Unauthorized")
                return
            }
            ctx.state.user = user
            return next()
        })(ctx, next)
    }

