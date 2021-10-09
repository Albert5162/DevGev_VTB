let passport = require('koa-passport');
const BearerStrategy = require('./strategies/BearerStrategy');

passport.use(BearerStrategy)

module.exports = passport
