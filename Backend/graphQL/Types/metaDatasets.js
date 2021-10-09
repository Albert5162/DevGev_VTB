// const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt} = require('graphql')
//
// module.exports.type = new GraphQLObjectType({
//     name: "Company",
//     description: "Возвращает объект компании. Вернет только присвоенные менеджеру.",
//     fields: () => ({
//         _id: { type: GraphQLID},
//         urn: { type: GraphQLString },
//         type: { type: GraphQLString },
//         name: { type: GraphQLString },
//         origin: { type: GraphQLString },
//         schemaMetadata: {
//             type: new GraphQLObjectType({
//                 name: "schemaMetadata",
//                 fields: () => ({
//                     name: String,
//                     fields: {
//                         type: new GraphQLList(new GraphQLObjectType({
//                             name: "fields",
//                             fields: () => ({
//                                 fieldPath: GraphQLString,
//                                 type: GraphQLString
//                             })
//                         }))
//                     }
//                 })
//             })
//         }
//     })
// })
//
// module.exports.resolve = async (parent = {}, args, {state: {user}}) => {
//
// }
