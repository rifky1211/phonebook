const ContactType = require('../types/contact');
const PaginationArgType = require('../types/paginationParam');
const PaginatedListType = require('../types/paginationOutput');
const service = require('../../services/index')

const TodoQueryTypes = {
  contact: {
    type: PaginatedListType(ContactType.contactType),
    args: {
      pagination: {
        type: PaginationArgType,
        defaultValue: { offset: 0, limit: 3, name: "", phone: "" }
      },
    },
    resolve: (_, args) => {
      const { offset, limit, name, phone } = args.pagination
      return {
        items: service.getContact(limit, offset, name, phone),
        count: service.totalData(name, phone)
      }
    },
  }
}

module.exports = TodoQueryTypes
