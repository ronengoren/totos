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

    // Check if we are signed in...
    console.log(Fire.shared.uid + " undefined?");
    if (Fire.shared.uid) {
      // If we are, then we can get the first 5 posts
      this.makeRemoteRequest();
    } else {
      // If we aren't then we should just start observing changes. This will be called when the user signs in
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.makeRemoteRequest();
        }
      });
    }
  }

  // Append the item to our states `data` prop
  addPosts = posts => {
    this.setState(previousState => {
      let data = {
        ...previousState.data,
        ...posts
      };
      return {
        data,
        // Sort the data by timestamp
        posts: Object.values(data).sort((a, b) => a.timestamp < b.timestamp)
      };
    });
  };

  // Call our database and ask for a subset of the user posts
  makeRemoteRequest = async lastKey => {
    // If we are currently getting posts, then bail out..
    if (this.state.loading) {
      return;
    }
    this.setState({ loading: true });

    // The data prop will be an array of posts, the cursor will be used for pagination.
    const { data, cursor } = await Fire.shared.getPaged({
      size: PAGE_SIZE,
      start: lastKey
    });

    this.lastKnownKey = cursor;
    // Iteratively add posts
    let posts = {};
    for (let child of data) {
      posts[child.key] = child;
    }
    this.addPosts(posts);

    // Finish loading, this will stop the refreshing animation.
    this.setState({ loading: false });
  };

  // Because we want to get the most recent items, don't pass the cursor back.
  // This will make the data base pull the most recent items.
  _onRefresh = () => this.makeRemoteRequest();

  // If we press the "Load More..." footer then get the next page of posts
  onPressFooter = () => this.makeRemoteRequest(this.lastKnownKey);

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

        {/* <ListFeed
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this._onRefresh}
            />
          }
          onPressFooter={this.onPressFooter}
          data={this.state.posts}
        /> */}
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
