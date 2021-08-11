const {GraphQLObjectType, GraphQLList} = require('graphql');
var services = require('../../services');
var userType = require('../types/contact').contactType;

// Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      contacts: {
        type: new GraphQLList(userType),
        resolve: services.getContact
      }
    }
  }
});