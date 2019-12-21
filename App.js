import React, { Component, UseState } from "react";
import { ActivityIndicator, NativeModules, View } from "react-native";

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
import * as Font from "expo-font";

const UIManager = NativeModules.UIManager;

const rootReducer = combineReducers({
  tasks: tasksReducer,
  lists: listsReducer,
  categories: cateReducer,
  theme: themeReducer,
  profile: profileReducer,
  settings: settingsReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
  state = {
    uiTheme: false,
    ready: false
  };

  componentDidMount() {
    initDatabase(() => {
      initTheme(state => {
        this.setState(state);
      });
    });
    Font.loadAsync({
      "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
      "roboto-italic": require("./assets/fonts/Roboto-Italic.ttf"),
      "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
      Roboto: {
        uri: require("./assets/fonts/Roboto-Regular.ttf")
      }
    });
  }

  omponentWillMount() {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    const { uiTheme, ready } = this.state;
    return ready ? (
      <Provider store={store}>
        <ThemeContext.Provider value={getTheme(uiTheme)}>
          <Router />
        </ThemeContext.Provider>
      </Provider>
    ) : (
      <View style={activity}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}

export default App;
