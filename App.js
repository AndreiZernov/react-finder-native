import React from "react"
import 'react-native-get-random-values'
import { createStore } from "redux"
import TabNavigator from './navigator/TabNavigator'
import { Provider } from "react-redux"
import { DataItemsProvider } from './contexts/dataItemsContext'
import 'react-native-get-random-values'


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
    case "OPEN_LOGIN":
      return { ...state, action: "openLogin" };
    case "CLOSE_LOGIN":
      return { ...state, action: "closeLogin" };
    case "OPEN_SIGNUP":
      return { ...state, action: "openSignup" };
    case "CLOSE_SIGNUP":
      return { ...state, action: "closeSignup" };
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
        <TabNavigator />
      </Provider>
    </DataItemsProvider>
  )
}


export default App;
