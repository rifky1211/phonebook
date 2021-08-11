const {GraphQLSchema, GraphQLObjectType} = require('graphql');
var queryType = require('./queries/contacts').queryType;
var mutations = require('./mutations/index');

exports.contactSchema = new GraphQLSchema({
  query: queryType,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations
  })
})