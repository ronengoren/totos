import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";

import ToDo from "../container/ToDo/ToDo";
import ConfigTask from "../container/Tasks/ConfigTask/ConfigTask";
import QuicklyTaskList from "../container/QuicklyList/QuicklyTaskList";
import CategoriesList from "../container/Categories/CategoriesList";
import Drawer from "../container/Drawer/Drawer";
import Themes from "../container/Themes/Themes";
import Theme from "../container/Themes/Theme";
import Profile from "../container/Profile/Profile";
import Settings from "../container/Settings/Settings";
import Backups from "../container/Backup/Backup";
import About from "../components/About/About";

const HomeStack = createStackNavigator(
  {
    ToDo: { screen: ToDo }
  },
  {
    initialRouteName: "ToDo",
    headerMode: "none"
  }
);

export default HomeStack;
