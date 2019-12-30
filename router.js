import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import ToDo from "./container/ToDo/ToDo";
import ConfigTask from "./container/Tasks/ConfigTask/ConfigTask";
import QuicklyTaskList from "./container/QuicklyList/QuicklyTaskList";
import CategoriesList from "./container/Categories/CategoriesList";
import Drawer from "./container/Drawer/Drawer";
import Themes from "./container/Themes/Themes";
import Theme from "./container/Themes/Theme";
import Profile from "./container/Profile/Profile";
import Settings from "./container/Settings/Settings";
import Backups from "./container/Backup/Backup";
import About from "./components/About/About";
import tabBarIcon from "./utils/tabBarIcon";
import SelectPhotoScreen from "./screens/SelectPhotoScreen";
import FeedScreen from "./screens/FeedScreen";
import NewPostScreen from "./screens/NewPostScreen";

const navigator = createBottomTabNavigator(
  {
    // The name `Feed` is used later for accessing screens
    Feed: {
      // Define the component we will use for the Feed screen.
      screen: FeedScreen,
      navigationOptions: {
        // Add a cool Material Icon for this screen
        tabBarIcon: tabBarIcon("home")
      }
    },
    // All the same stuff but for the Photo screen
    Photo: {
      screen: SelectPhotoScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon("add-circle")
      }
    }
  },
  {
    // We want to hide the labels and set a nice 2-tone tint system for our tabs
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "black",
      inactiveTintColor: "gray"
    }
  }
);

const MainNavigator = createStackNavigator(
  {
    Main: {
      screen: navigator
      // , navigationOptions: { title: "2023" }
    },
    NewPost: NewPostScreen,

    ConfigTask: { screen: ConfigTask },
    QuicklyTaskList: { screen: QuicklyTaskList },
    CategoriesList: { screen: CategoriesList },
    Profile: { screen: Profile },
    Drawer: { screen: Drawer },
    Themes: { screen: Themes },
    Theme: { screen: Theme },
    Settings: { screen: Settings },
    Backups: { screen: Backups },
    About: { screen: About }
  },
  {
    // cardStyle: { backgroundColor: "white" },
    initialRouteName: "Main",
    headerMode: "none"
  }
);

const router = createAppContainer(MainNavigator);

export default router;
