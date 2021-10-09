const meta_datasetsModel = global.con.collection('meta_datasets');
const { v4: uuid } = require('uuid');

module.exports = {
    async addInfo(meta_array) {
        return meta_datasetsModel.insertMany(meta_array)
    },
    async getShowcase() {
        let meta_datasets = []
        let data = await meta_datasetsModel.find({active: 1})
        await data.forEach(data => meta_datasets.push(data));
        return meta_datasets
    }
}
