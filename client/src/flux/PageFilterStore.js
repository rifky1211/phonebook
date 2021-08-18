import { ReduceStore } from "flux/utils";
import dispatcher from "./Dispatcher"
import { UPDATE_FILTER } from '../constants'

class PageFilterStore extends ReduceStore {
  constructor() {
    super(dispatcher);
  }

  getInitialState() {
    return {
      page: 1,
      name: "",
      phone: "",
      totalData: 0,
    }
  }

  reduce(state , action) {
    switch (action.type) {
      case UPDATE_FILTER:
        console.log("action", action)
        return {
          page: action.page,
          name: action.name,
          phone: action.phone,
          totalData: action.totalData,
        }
        default:
        return state;
    }
  }
}

export default new PageFilterStore();
