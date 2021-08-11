var {GraphQLNonNull, GraphQLString} = require('graphql');
var UserType = require('../types/contact');
var services = require('../../services');

exports.remove = {
  type: UserType.contactType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    return services.deletecontact(params);
  }
}