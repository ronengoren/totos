import { AppLoading } from "expo";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { getTheme, ThemeContext } from "react-native-material-ui";
import { activity } from "./shared/styles";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Router from "./router";
import tasksReducer from "./store/reducers/tasks";
import listsReducer from "./store/reducers/lists";
import cateReducer from "./store/reducers/categories";
import themeReducer from "./store/reducers/theme";
import profileReducer from "./store/reducers/profile";
import settingsReducer from "./store/reducers/settings";
import { initDatabase, initTheme } from "./db";

import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { Component } from "react";
import { ActivityIndicator, NativeModules, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

class App extends Component {
  state = {
    uiTheme: false,
    ready: false
  };
  render() {
    const { uiTheme, ready } = this.state;

    return <Router />;
  }
}
export default App;
