const {GraphQLSchema, GraphQLObjectType} = require('graphql');
var QueryType = require('./queries/index')
var mutations = require('./mutations/index');

console.log("mutations", mutations)
exports.contactSchema = new GraphQLSchema({
  query: QueryType,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations
  })
})