import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/fontawesome/css/all.min.css";
import "./assets/styles/style.css";

import LandingPage from "./views/LandingPage";

import rootReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));
 
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <LandingPage></LandingPage>
      </Provider>
    </div>
  );
}

export default App;
