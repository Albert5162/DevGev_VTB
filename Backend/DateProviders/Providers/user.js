const userModel = global.con.collection('users');
const { v4: uuid } = require('uuid');

module.exports = {
    async updateSessionToken(login, pass) {
        const token = uuid();
        const {modifiedCount} = await userModel.updateOne({login, pass}, {$set: {
                token,
            }})
        if (modifiedCount) {
            return token
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
    async addUser(login, pass, company) {
        return await userModel.insertOne({login, pass, company})
    }

}
