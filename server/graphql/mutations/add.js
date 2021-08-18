const { GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");
var ContactType = require("../types/contact");
var services = require("../../services");

exports.add = {
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
    },
  },
  resolve(root, params) {
    return services.createContact(params);
  },
};
