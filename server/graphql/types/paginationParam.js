
const {GraphQLInputObjectType, GraphQLInt, GraphQLString}  = require('graphql');

const PaginationArgType = new GraphQLInputObjectType({
  name: 'PaginationArg',
  fields: {
    offset: {
      type: GraphQLInt,
      description: "Skip n rows."
    },
    limit: {
      type: GraphQLInt,
      description: "total data"
    },
    name: {
      type: GraphQLString,
      description: "search by name"
    },
    phone: {
      type: GraphQLString,
      description: "search by phone"
    },
  }
})

module.exports = PaginationArgType