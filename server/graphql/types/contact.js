const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require("graphql");

// User Type
exports.contactType = new GraphQLObjectType({
  name: "contact",
  fields: function () {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      name: {
        type: GraphQLString,
      },
      phone: {
        type: GraphQLString,
      },
    };
  },
});
