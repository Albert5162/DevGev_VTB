const userModel = global.con.collection('users');
const { v4: uuid } = require('uuid');
const crypto = require('crypto');
let crypto_conf =  {
        iterations: 100,
        length: 128,
        digest: 'sha512',
    }

module.exports = {
    async updateSessionToken(login, pass) {
        const token = uuid();
        const user = await userModel.findOne({login})
        if (user) {
            const goodPass = await this.checkPassword(pass, user.salt, user.passwordHash)
            if (goodPass) {
                await userModel.updateOne({login}, {$set: {
                        token
                }})
                return token
            }
        }
    },
    async getByToken(token) {
        return await userModel.findOne({token})
    },
    async getByLogin(login) {
        return await userModel.findOne({login})
    },
    async createSession(token) {
        let user = await this.getByToken(token)
        if (!user) return false
        return user
    },
    generatePassword(salt, password){
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(
                password, salt,
                crypto_conf.iterations,
                crypto_conf.length,
                crypto_conf.digest,
                (err, key) => {
                    if (err) return reject(err);
                    resolve(key.toString('hex'));
                }
            );
        });
    },
    generateSalt() {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(crypto_conf.length, (err, buffer) => {
                if (err) return reject(err);
                resolve(buffer.toString('hex'));
            });
        });
    },
    async genPassword(password) {
        let salt = await this.generateSalt();
        let passwordHash = await this.generatePassword(salt, password);
        return {salt, passwordHash}
    },
    async checkPassword(password, salt, passwordHash) {
        if (!password) return false;
        let gen_p = await this.generatePassword(salt, password);
        return gen_p === passwordHash
    },

    async addUser(login, pass, company) {
        let {salt, passwordHash} = await this.genPassword(pass)
        return await userModel.insertOne({login, salt, passwordHash, company})
    }

}
