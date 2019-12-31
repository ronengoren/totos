import firebase from "firebase";
import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Spinner from "../components/UI/Spinner/Spinner";
import QuicklyList from "../container/QuicklyList/QuicklyList";
import TaskList from "../container/Tasks/TaskList";

import ListFeed from "../container/List/ListFeed";
import Fire from "../Fire";
import Template from "../container/Template/Template";
import { connect } from "react-redux";
import * as actions from "../store/actions";
// Set the default number of images to load for each pagination.
const PAGE_SIZE = 5;
console.disableYellowBox = true;
class FeedScreen extends Component {
  state = {
    loading: false,
    posts: [],
    data: {},
    tabs: {
      index: 0,
      routes: [
        { key: "tasks", title: "Tasks" },
        { key: "lists", title: "Quickly lists" }
      ]
    }
  };

  componentDidMount() {
    this.props.onInitTheme();
    this.props.onInitCategories();
    this.props.onInitProfile();
    this.props.onInitToDo();
    this.props.onInitLists();
    this.props.onInitSettings(lang => {
      const { tabs } = this.state;
      if (lang === "en") {
        tabs.routes[0].title = "Tasks";
        tabs.routes[1].title = "Quickly lists";
      } else if (lang === "pl") {
        tabs.routes[0].title = "Zadania";
        tabs.routes[1].title = "Szybkie listy";
      }
      this.setState({ tabs, loading: false });
    });
  }

  render() {
    const { tabs, loading } = this.state;
    const { navigation, theme, hideTabView } = this.props;
    // Let's make everything purrty by calling this method which animates layout changes.
    LayoutAnimation.easeInEaseOut();
    return (
      <React.Fragment>
        {theme && !loading ? (
          <Template bgColor={theme.secondaryBackgroundColor}>
            <TabView
              navigationState={tabs}
              tabStyle={{ backgroundColor: theme.primaryColor }}
              onIndexChange={index => {
                tabs.index = index;
                this.setState({ tabs });
              }}
              renderScene={SceneMap({
                tasks: () => <TaskList navigation={navigation} />,
                lists: () => <QuicklyList navigation={navigation} />
              })}
              renderTabBar={props => (
                <TabBar
                  {...props}
                  onTabPress={({ route }) => {
                    props.jumpTo(route.key);
                  }}
                  indicatorStyle={{ backgroundColor: theme.headerTextColor }}
                  style={{
                    backgroundColor: theme.primaryColor,
                    height: !!hideTabView ? 0 : 50
                  }}
                />
              )}
              renderLazyPlaceholder={() => <Spinner />}
              lazy
            />
          </Template>
        ) : (
          <Spinner color="#0000ff" />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme.theme,
    lang: state.settings.settings.lang,
    hideTabView: state.settings.settings.hideTabView
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onInitToDo: () => dispatch(actions.initToDo()),
    onInitLists: () => dispatch(actions.initLists()),
    onInitCategories: () => dispatch(actions.initCategories()),
    onInitTheme: () => dispatch(actions.initTheme()),
    onInitProfile: () => dispatch(actions.initProfile()),
    onInitSettings: callback => dispatch(actions.initSettings(callback))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
