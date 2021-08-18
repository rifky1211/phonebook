const {GraphQLObjectType}  = require('graphql');
const TodoQueryTypes = require('./contacts')

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    ...TodoQueryTypes,
  },
});

module.exports = QueryType
