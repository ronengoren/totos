import * as WebBrowser from "expo-web-browser";
import React, { PureComponent } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Spinner from "../../components/UI/Spinner/Spinner";
import TaskList from "../Tasks/TaskList";
import Template from "../Template/Template";
import QuicklyList from "../QuicklyList/QuicklyList";
// import { connect } from "react-redux";
// import * as actions from "../../store/actions";

class ToDo extends PureComponent {
  state = {
    loading: true,
    tabs: {
      index: 0,
      routes: [
        { key: "tasks", title: "Tasks" },
        { key: "lists", title: "Quickly lists" }
      ]
    }
  };

  render() {
    const { tabs, loading } = this.state;
    const { navigation, theme, hideTabView } = this.props;
    return <React.Fragment></React.Fragment>;
  }
}
export default ToDo;
