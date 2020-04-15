import React from "react"
import { createStore } from "redux";
import { Provider } from "react-redux";
import AppNavigator from './navigator/AppNavigator'
import { DataItemsProvider } from './contexts/dataItemsContext'



const initialState = {
  action: "",
  name: 'User'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MENU":
      return { ...state, action: "openMenu" };
    case "CLOSE_MENU":
      return { ...state, action: "closeMenu" };
    case "UPDATE_NAME":
      return { ...state, name: action.name };
    case "OPEN_CARD":
      return { ...state, action: "openCard" };
    case "CLOSE_CARD":
      return { ...state, action: "closeCard" };
    case "OPEN_LOGIN":
      return { ...state, action: "openLogin" };
    case "CLOSE_LOGIN":
      return { ...state, action: "closeLogin" };
    case "OPEN_NOTIF":
      return { ...state, action: "openNotif" };
    case "CLOSE_NOTIF":
      return { ...state, action: "closeNotif" };
    default:
      return state;
  }
};


const store = createStore(reducer);

const App = () => {


  return(
    <DataItemsProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </DataItemsProvider>
  )
}


export default App;
