import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import User from "./User";
import dispatcher from "./Dispatcher";

class UserStore extends ReduceStore {
  constructor() {
    super(dispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce(state, action) {
    switch (action.type) {
      case "DRAW_USER":
        return Immutable.OrderedMap(
          action.phonebooks.map((item) => {
            item.sent = true;
            console.log(item.total)
            return [item.id, item];
          })
        );
      case "DRAW_ADD_USER":
        return state.set(
          action.id,
          new User({
            id: action.id,
            name: action.name,
            phone: action.phone,
            sent: true,
          })
        );

      case "DRAW_EDIT_USER":
        return state.set(
          action.id,
          new User({
            id: action.id,
            name: action.name,
            phone: action.phone,
            sent: true,
          })
        );

      case "SUCCESS_FILTER_USER":
        return state.filter((item) => {
          if (action.name) {
            return item.name.includes(action.name);
          } else if (action.phone) {
            return item.phone.includes(action.phone);
          } else {
            return item;
          }
        });

      case "FAILED_ADD_USER":
        return state.set(
          action.id,
          new User({
            id: action.id,
            name: action.name,
            phone: action.phone,
            sent: false,
          })
        );

      case "SUCCESS_RESEND_USER":
        return state.setIn([action.id, "sent"], true);

      case "SUCCESS_DELETE_USER":
        return state.delete(action.id);

      case "SUCCESS_ADD_USER":
      case "SUCCESS_EDIT_USER":
        break;
      default:
        return state;
    }
  }
}

export default new UserStore();
