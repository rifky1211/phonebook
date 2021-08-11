const {GraphQLNonNull, GraphQLString} = require('graphql');
var UserType = require('../types/contact');
var services = require('../../services');

exports.add = {
  type: UserType.contactType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    phone: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    return services.createContact(params);
  }
}