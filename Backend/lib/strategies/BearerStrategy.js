let BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = new BearerStrategy(
    async function(token, done) {
        try {
            let user = await dbProvider.user.createSession(token);
            if (!user) { return done(null, false); }
            return done(null, user, { scope: 'all' });
        } catch (e) {
            console.log(new Date(), e)
            done(e);
        }
    }
)
