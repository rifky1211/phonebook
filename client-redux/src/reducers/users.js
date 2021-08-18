import {
  DRAW_LOAD_USER,
  DRAW_ADD_USER,
  FAILED_ADD_USER,
  SUCCESS_RESEND_USER,
  SUCCESS_ADD_USER,
  REMOVE_USER,
  SUCCESS_REMOVE_USER,
  SUCCESS_FIND_USER,
  DRAW_EDIT_USER,
  SUCCESS_EDIT_USER,
} from "../constants";

const users = (state = [], action) => {
  switch (action.type) {
    case DRAW_LOAD_USER:
      return action.users.map((item) => {
        return {
          total: item.total,
          id: item.id,
          name: item.name,
          phone: item.phone,
          sent: true,
        };
      });

    case DRAW_ADD_USER:
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          phone: action.phone,
          sent: true,
        },
      ];

    case FAILED_ADD_USER:
      return state.map((item) => {
        if (item.id === action.id) {
          item.sent = false;
        }
        return item;
      });

    case SUCCESS_RESEND_USER:
      return state.map((item) => {
        if (item.id === action.id) {
          item.sent = true;
        }
        return item;
      });

    case REMOVE_USER:
      return state.filter((item) => {
        return item.id !== action.id;
      });

    case SUCCESS_FIND_USER:
      return state.filter((item) => {
        if (action.name) {
          return item.name.includes(action.name);
        } else if (action.phone) {
          return item.phone.includes(action.phone);
        } else {
          return item;
        }
      });

    case DRAW_EDIT_USER:
      return state.map((item) => {
        if (item.id === action.id) {
          item.name = action.name
          item.phone = action.phone
          console.log("aaa")
        }
        return item
      });

    case SUCCESS_ADD_USER:
    case SUCCESS_EDIT_USER:
    case SUCCESS_REMOVE_USER:
    default:
      return state;
  }
};

export default users;
