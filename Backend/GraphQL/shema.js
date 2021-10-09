const {GraphQLSchema, GraphQLObjectType} = require('graphql');
const path = require("path")
const {readdir} = require('fs/promises');
let Types = []
async function graphObjectGenerator(dir) {
    let Files = await readdir(dir)
    let fieldsOb = {};
    for (let File of Files) {
        let type = require(path.join(dir, File));
        if (type.type && type.resolve) {
            fieldsOb[File.slice(0, -3)] = {
                type: type.type,
                args: type.args,
                resolve: type.resolve
            }
        }
    }
    return fieldsOb
}
async function schemaGenerator() {
    let query_obj = await graphObjectGenerator(path.join(__dirname, '/Types'))
    let mutation_obj = await graphObjectGenerator(path.join(__dirname, '/Mutations'))
    let query = new GraphQLObjectType({
        name: "Query",
        fields: () => query_obj
    })
    let mutation = new GraphQLObjectType({
        name: "Mutation",
        fields: () => mutation_obj
    })
    return new GraphQLSchema({
        query,
        mutation
    })
}

module.exports = schemaGenerator

