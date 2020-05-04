import React from "react";
import {
  REACT_APP_API_SPACE,
  REACT_APP_ACCESS_TOKEN,
} from "react-native-dotenv";

const contentful = require("contentful/dist/contentful.browser.min.js");

const Client = contentful.createClient({
  space: REACT_APP_API_SPACE,
  accessToken: REACT_APP_ACCESS_TOKEN,
});

export default Client;
