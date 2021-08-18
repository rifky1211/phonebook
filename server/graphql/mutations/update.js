const {GraphQLNonNull, GraphQLString} = require('graphql');
var ContactType = require('../types/contact');
var services = require('../../services');

exports.update = {
  type: ContactType.contactType,
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
    return services.updateContact(params)
  }
}