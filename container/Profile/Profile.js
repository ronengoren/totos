import React, { PureComponent } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import Input from "../../components/UI/Input/Input";
import Template from "../Template/Template";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { Toolbar } from "react-native-material-ui";
import Spinner from "../../components/UI/Spinner/Spinner";
import { flex, separator } from "../../shared/styles";
// import { BannerAd } from "../../../adsAPI";
import GlobalStyles from "../../components/global/GlobalStyles.js";
import GlobalFunctions from "../../components/global/GlobalFunctions.js";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import ActionSheet from "react-native-actionsheet";
import Carousel from "react-native-snap-carousel";
import Mailer from "react-native-mail";

const BORDER_RADIUS = 10;
const CLOSE_SCROLL_DISTANCE = 100;
const REPORT_OPTION = "Report User";
const BLOCK_OPTION = "Block User";
const ACTION_SHEET_OPTIONS = ["Cancel", REPORT_OPTION, BLOCK_OPTION];
const WIDTH = Dimensions.get("window").width;

class Profile extends PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    loading: true
  };

  componentDidMount() {
    this.props.onInitSettings();
    this.props.onInitProfile(() => {
      this.setState({ loading: false });
    });
  }

  getPermissionAsync = async () => {
    const { translations } = this.props;
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert(translations.permission);
        return false;
      } else {
        return this.pickImage();
      }
    } else {
      return this.pickImage();
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.props.onChangeAvatar(result.uri);
    }
  };
  _renderImages() {
    let imageContainerHeight = (this.props.pageHeight * 3) / 4;
    return (
      <Carousel
        style={[styles.carousel, { height: imageContainerHeight }]}
        loop={false}
        animate={false}
        indicatorOffset={imageContainerHeight - 65}
        indicatorColor="rgba(220,220,220,1)"
        inactiveIndicatorColor="rgba(160,160,160,0.6)"
        indicatorSize={40}
      >
        {/* {this._shouldRenderImageWithIndex(0)}
        {this._shouldRenderImageWithIndex(1)}
        {this._shouldRenderImageWithIndex(2)} */}
      </Carousel>
    );
  }
  _shouldRenderImageWithIndex(index) {
    if (
      this.props.photos &&
      this.props.photos.length > index &&
      this.props.photos[index] &&
      this.props.photos[index].large
    ) {
      let imageContainerHeight = (this.props.pageHeight * 3) / 4;
      let source = this.props.photos[index].large;
      return (
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={this._closeProfileCard.bind(this)}
        >
          <View style={[styles.imageView, { height: imageContainerHeight }]}>
            <LoadableImage
              style={[styles.image, { height: imageContainerHeight }]}
              imageStyle={{ width: WIDTH, height: imageContainerHeight }}
              source={{ uri: source }}
              _key={index == 0 ? this.props.id : ""}
            />
            <Image
              style={styles.topGradient}
              source={require("../../assets/images/topGradient.png")}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }
  _closeProfileCard() {
    if (this.props.exitFunction) {
      this.props.exitFunction();
    }
  }
  _shouldRenderSafeNameText() {
    let lName = this.props.lastName.toLowerCase();
    let fName = this.props.firstName.toLowerCase();
    let email = this.props.email.toLowerCase();

    if (
      fName.length <= 2 ||
      lName.length <= 2 ||
      !(email.includes(lName) || email.includes(fName))
    ) {
      let emailName = email.split("@")[0];
      emailName = emailName.split(".");
      if (emailName.length >= 2) {
        emailName = emailName[0] + "." + emailName[1][0];
      } else {
        emailName = emailName[0];
      }
      return <Text style={styles.safetyNameText}>{emailName}</Text>;
    }
  }

  render() {
    let _scrollView: ScrollView;
    let pageHeight = this.props.pageHeight;
    let isTeamMember = this.props.teamMember === true;

    const { loading } = this.state;
    const {
      navigation,
      theme,
      tasks,
      finished,
      profile,
      categories,
      translations
    } = this.props;
    let list;
    const listData = [];
    listData.push({
      label: translations.allTask,
      data: tasks.length + finished.length
    });
    listData.push({ label: translations.finishedTask, data: finished.length });
    listData.push({ label: translations.endedTask, data: profile.endedTask });
    listData.push({
      label: translations.allCategories,
      data: categories.length
    });

    if (profile.id === 0) {
      list = listData.map((item, index) => (
        <View key={index}>
          <View
            style={[
              styles.item,
              { backgroundColor: theme.primaryBackgroundColor }
            ]}
          >
            <Text style={{ color: theme.primaryColor, fontSize: 16 }}>
              {item.label}
            </Text>
            <Text style={{ fontSize: 19, color: theme.textColor }}>
              {item.data}
            </Text>
          </View>
          <View style={separator} />
        </View>
      ));
    }

    return (
      <Template>
        {/* <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement={translations.title}
        /> */}

        {!loading ? (
          <React.Fragment>
            {profile.id === 0 && (
              <View style={[styles.container, this.props.style]}>
                <View style={{ flex: 1 }}>
                  <View
                    style={[GlobalStyles.absoluteCover, styles.background]}
                  />
                </View>
                <View style={[GlobalStyles.absoluteCover]}>
                  <ScrollView
                    style={styles.touchArea}
                    ref={scrollView => {
                      _scrollView = scrollView;
                    }}
                  >
                    <View
                      style={[
                        styles.card,
                        {
                          // pageHeight +
                          minHeight: BORDER_RADIUS
                        }
                      ]}
                    >
                      <TouchableWithoutFeedback
                        style={{ flex: 1 }}
                        onPress={this._closeProfileCard.bind(this)}
                      >
                        <View style={styles.textContainer}>
                          <View style={styles.titleContainer}>
                            <Text style={[GlobalStyles.boldText, styles.title]}>
                              "firstName lastName"
                              {/* {this.props.firstName} {this.props.lastName}
                              {this._shouldRenderSafeNameText()} */}
                            </Text>
                          </View>

                          <Text style={[GlobalStyles.subtext, styles.subTitle]}>
                            {this.props.major}
                            "this.props.major"
                          </Text>
                          <Text style={[GlobalStyles.text, styles.text]}>
                            {this.props.description}
                            "this.props.description"
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <Image
                        style={styles.bottomGradient}
                        source={require("../../assets/images/bottomGradient.png")}
                      />
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={this._closeProfileCard.bind(this)}
                      >
                        <Image
                          style={styles.closeButtonView}
                          source={require("../../assets/images/x.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </ScrollView>

                  {/* <TouchableOpacity onPress={() => this.getPermissionAsync()}>
                  <Image
                    style={styles.image}
                    source={
                      profile.avatar
                        ? { uri: profile.avatar }
                        : require("../../assets/images/profile.png")
                    }
                  />
                </TouchableOpacity> */}
                  {/* <Input
                  elementConfig={{ label: "" }}
                  style={styles.name}
                  value={profile.name}
                  color={theme.primaryColor}
                  changed={value => this.props.onChangeName(value)}
                /> */}
                </View>
              </View>
            )}
            {/* <ScrollView style={flex}>{list}</ScrollView> */}
          </React.Fragment>
        ) : (
          <Spinner />
        )}
        {/* <BannerAd /> */}
      </Template>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  closeButton: {
    position: "absolute",
    left: 20,
    top: 20,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  closeButtonView: {
    resizeMode: "contain",
    height: 15,
    width: 15,
    flex: 1
  },
  moreButton: {
    position: "absolute",
    right: 20,
    top: 20,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  moreButtonView: {
    resizeMode: "contain",
    height: 30,
    width: 30,
    flex: 1
  },
  topGradient: {
    position: "absolute",
    resizeMode: "cover",
    top: 0,
    height: 71,
    width: WIDTH,
    opacity: 0.8
  },
  bottomGradient: {
    position: "absolute",
    resizeMode: "cover",
    bottom: 0,
    height: 53,
    width: WIDTH,
    opacity: 0.6
  },
  background: {
    backgroundColor: "black",
    opacity: 0.8
  },
  touchArea: {
    flex: 1
  },
  card: {
    borderRadius: BORDER_RADIUS,
    overflow: "hidden",
    backgroundColor: "#FBFBFB",
    elevation: 2,
    flex: 1
  },
  carousel: {
    flex: 1,
    width: WIDTH
  },
  imageView: {
    overflow: "hidden",
    width: WIDTH
  },
  image: {
    width: WIDTH
  },
  textContainer: {
    backgroundColor: "white"
  },
  titleContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingBottom: 7
  },
  title: {},
  check: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    marginLeft: 3,
    marginBottom: 4
  },
  subTitle: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5
  },
  text: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50
  },
  safetyNameText: {
    opacity: 0.5,
    fontSize: 15,
    fontWeight: "100"
  },
  item: {
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 10
  },
  name: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 21
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    marginBottom: -20,
    alignSelf: "center"
  }
});

const mapStateToProps = state => {
  return {
    theme: state.theme.theme,
    settings: state.settings.settings,
    tasks: state.tasks.tasks,
    finished: state.tasks.finished,
    profile: state.profile,
    categories: state.categories.categories,
    translations: state.settings.translations.Profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onInitSettings: () => dispatch(actions.initSettings()),
    onInitProfile: callback => dispatch(actions.initProfile(callback)),
    onChangeName: name => dispatch(actions.changeName(name)),
    onChangeAvatar: avatar => dispatch(actions.changeAvatar(avatar))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
