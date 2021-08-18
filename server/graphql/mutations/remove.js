var {GraphQLNonNull, GraphQLString} = require('graphql');
var ContactType = require('../types/contact');
var services = require('../../services');

console.log("contact", ContactType.contactType)
exports.remove = {
  type: ContactType.contactType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    return services.deletecontact(params);
  }
}