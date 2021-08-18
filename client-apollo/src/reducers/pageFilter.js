import { UPDATE_FILTER } from "../constants";
  
  const initialState = {
      page: 1,
      name: "",
      phone: "",
      totalData: 0
  }

  const pageFilter = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_FILTER:
        return {
            page: action.page,
            name: action.name,
            phone: action.phone,
            totalData: action.totalData
        }
  
      
      default:
        return state;
    }
  };
  
  export default pageFilter;
  