const meta_datasetsModel = global.con.collection('meta_datasets');
const { v4: uuid } = require('uuid');

module.exports = {
    async addInfo(meta_array) {
        return meta_datasetsModel.insertMany(meta_array)
    },
    async getShowcase() {
        let meta_datasets = []
        // let data = await meta_datasetsModel.find({active: 1})
        let data = await meta_datasetsModel.aggregate([
            {
                '$addFields': {
                    'fichers': {
                        '$size': '$schemaMetadata.fields'
                    }
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'user_id',
                    'foreignField': '_id',
                    'as': 'user'
                }
            }, {
                '$project': {
                    'urn': 1,
                    'name': 1,
                    'fichers': 1,
                    'description': 1,
                    'user': {
                        '$first': '$user.company'
                    }
                }
            }
        ])
        await data.forEach(data => meta_datasets.push(data));
        return meta_datasets
        console.log(data)
    }

}
