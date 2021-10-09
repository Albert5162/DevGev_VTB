const db = require('../lib/mongoConnect');
const {readdir} = require('fs/promises');

async function create_models() {
    try {
        global.con = await db;
        let Files = await readdir('dateProviders/Providers');
        let dbProvider = {}
        for (let File of Files) {
            let provider = require('./Providers/' + File);
            if (provider) {
                dbProvider[File.slice(0, -3)] = provider;
            }
        }
        return dbProvider
    } catch (e) {
       console.error(e)
    }
}
module.exports = create_models
