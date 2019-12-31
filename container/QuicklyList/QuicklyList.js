import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Navigator,
  TouchableOpacity,
  Alert,
  Animated,
  Image,
  BackAndroid,
  ScrollView
} from "react-native";
import {
  ActionButton,
  IconToggle,
  ListItem,
  Toolbar
} from "react-native-material-ui";
import { generateDialogObject } from "../../shared/utility";
import Dialog from "../../components/UI/Dialog/Dialog";
import AnimatedView from "../AnimatedView/AnimatedView";
import { empty, flex, fullWidth } from "../../shared/styles";
import Spinner from "../../components/UI/Spinner/Spinner";

import { connect } from "react-redux";
import * as actions from "../../store/actions";
import ActionSheet from "react-native-actionsheet";
import GlobalStyles from "../../components/global/GlobalStyles";

const UP = 1;
const DOWN = -1;
const global = require("../../components/global/GlobalFunctions");

const IS_ANDROID = Platform.OS === "android";
const NAVBAR_HEIGHT = IS_ANDROID ? 54 : 64; // TODO: check the android tabbar height
const PAGE_HEIGHT = Dimensions.get("window").height - NAVBAR_HEIGHT;
const PAGE_WIDTH = Dimensions.get("window").width;
const NAVBAR_SELECTOR_WIDTH = PAGE_WIDTH * 0.2;
const NAVBAR_SELECTOR_HEIGHT = 2;
// const HEADER_TITLE_LEFT_MARGIN =
//   Platform.OS === "ios"
//     ? 0
//     : Navigator.NavigationBar.Styles.Stages.Left.Title.marginLeft || 0;
// const SAVE_BUTTON_STATE = global.saveButtonStates();
const NAVIGATOR_BACKHANDLER = "NAVIGATOR_BACKHANDLER";
class QuicklyList extends Component {
  state = {
    dialog: {},
    showDialog: false,
    amounts: {},
    searchText: "",

    scroll: 0,
    offset: 0,
    scrollDirection: 0,
    bottomHidden: false,
    loading: true
  };

  componentDidMount() {
    this.reloadListsAmount();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.lists !== this.props.lists) {
      this.reloadListsAmount();
    }
  }

  reloadListsAmount = () => {
    const { lists } = this.props;
    const { amounts } = this.state;
    if (lists.length) {
      lists.map(list => {
        this.props.onInitList(list.id, tasks => {
          amounts[list.id] = tasks.length;
          this.setState({ amounts, loading: false });
        });
      });
    } else {
      this.setState({ loading: false });
    }
  };

  onScroll = e => {
    const currentOffset = e.nativeEvent.contentOffset.y;
    const sub = this.state.offset - currentOffset;

    if (sub > -10 && sub < 10) return;
    this.state.offset = e.nativeEvent.contentOffset.y;

    const currentDirection = sub > 0 ? UP : DOWN;

    if (this.state.scrollDirection !== currentDirection) {
      this.state.scrollDirection = currentDirection;

      this.setState({
        bottomHidden: currentDirection === DOWN
      });
    }
  };

  showDialog = (list_id, list_name) => {
    const { translations } = this.props;

    const dialog = generateDialogObject(
      translations.defaultTitle,
      `${translations.dialogDescription1} ${list_name} ${translations.dialogDescription2}`,
      {
        [translations.yes]: () => {
          this.setState({ showDialog: false });
          this.props.onRemoveList(list_id);
        },
        [translations.no]: () => {
          this.setState({ showDialog: false });
        }
      }
    );
    this.setState({ showDialog: true, dialog });
  };

  render() {
    const { dialog, showDialog, amounts, bottomHidden, loading } = this.state;
    const { lists, theme, navigation, translations } = this.props;

    const quicklyList = lists.map((list, index) => {
      // Searching system
      const searchText = this.state.searchText.toLowerCase();
      if (
        searchText.length > 0 &&
        list.name.toLowerCase().indexOf(searchText) < 0
      ) {
        return null;
      }

      return (
        <View key={index}>
          <AnimatedView value={1} duration={500}>
            <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
              {/* <ListItem
                divider
                dense
                onPress={() =>
                  navigation.navigate("QuicklyTaskList", { list: list })
                }
                style={{
                  container: [
                    styles.shadow,
                    { backgroundColor: theme.noneColor }
                  ],
                  primaryText: {
                    fontSize: 48,
                    color: theme.textColor
                  }
                }}
                rightElement={
                  <View style={styles.rightElements}>
                    <IconToggle
                      onPress={() => this.showDialog(list.id, list.name)}
                      name="delete"
                      color={theme.actionButtonColor}
                      size={26}
                    />
                  </View>
                }
                centerElement={{
                  primaryText: list.name,
                  secondaryText: `${translations.totalTasks} ${
                    amounts[list.id]
                  }`
                }}
              /> */}
            </View>
          </AnimatedView>
        </View>
      );
    });

    return (
      <View style={flex}>
        <Toolbar
          searchable={{
            autoFocus: true,
            placeholder: translations.search,
            onChangeText: value => this.setState({ searchText: value }),
            onSearchClosed: () => this.setState({ searchText: "" })
          }}
          leftElement="menu"
          centerElement={translations.quicklyLists}
          onLeftElementPress={() => navigation.navigate("Drawer")}
        />

        {showDialog && (
          <Dialog
            showModal={showDialog}
            title={dialog.title}
            description={dialog.description}
            buttons={dialog.buttons}
          />
        )}

        {!loading ? (
          <ScrollView
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="interactive"
            onScroll={this.onScroll}
            style={fullWidth}
          >
            {lists && lists.length ? (
              <View style={{ paddingTop: 20 }}>{quicklyList}</View>
            ) : (
              <Text style={[empty, { color: theme.textColor }]}>
                {translations.emptyList}
              </Text>
            )}
          </ScrollView>
        ) : (
          <Spinner />
        )}

        <View style={{ marginBottom: 40 }}>
          {/* <Button
            title="Add"
            hidden={bottomHidden}
            onPress={() =>
              navigation.navigate("QuicklyTaskList", { list: false })
            }
            icon="add"
            style={{
              container: { backgroundColor: theme.actionButtonColor },
              icon: { color: theme.actionButtonIconColor }
            }}
          /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3
  },
  rightElements: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  avatarPhoto: {
    height: 38,
    width: 38,
    borderRadius: 19
  },
  navigationBarContainer: {
    backgroundColor: "white"
  },
  navigationBarTitleContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  navigationBarTitleText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#474747",
    fontFamily: "Avenir Next"
  },
  coverView: {
    zIndex: 100
  },
  buttonArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: NAVBAR_SELECTOR_WIDTH
  },
  androidCenterButton: {
    alignSelf: "center",
    justifyContent: "center"
    // marginRight: HEADER_TITLE_LEFT_MARGIN
  },
  navBarIcon: {
    height: 20,
    resizeMode: "contain"
  },
  convoNavBarContainer: {
    alignItems: "center",
    padding: 13
  },
  convoNavBarIcon: {
    height: 18,
    width: 25,
    resizeMode: "contain"
  },
  navBarSelector: {
    position: "absolute",
    bottom: 0,
    width: NAVBAR_SELECTOR_WIDTH,
    backgroundColor: "black",
    height: NAVBAR_SELECTOR_HEIGHT,
    resizeMode: "cover"
  }
});

const mapStateToProps = state => {
  return {
    theme: state.theme.theme,
    settings: state.settings.settings,
    lists: state.lists.lists,
    translations: {
      ...state.settings.translations.QuicklyList,
      ...state.settings.translations.common
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitList: (id, callback) => dispatch(actions.initList(id, callback)),
    onRemoveList: list_id => dispatch(actions.removeList(list_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuicklyList);
