import React, { Component } from "react";
import {
  findNodeHandle,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated
} from "react-native";

import RectButton from "../../components/global/RectButton";
import GlobalStyles from "../../components/global/GlobalStyles";
import AuthErrors from "./AuthErrors";
import ProfilePhotoPicker from "../Settings/ProfilePhotoPicker";
import GlobalFunctions from "../../components/global/GlobalFunctions";
// import TagPage            from "../settings/TagPage.js";

const PageNames = require("../../components/global/GlobalFunctions").pageNames();

class CreateProfilePage extends Component {
  constructor(props) {
    super(props);

    // this.studentProfile = props.studentProfile || null;
    // this.token = props.token || null;
    // this.state = {
    //   firstName: this.studentProfile.firstName,
    //   lastName: this.studentProfile.lastName,
    //   description: "",
    //   major: this.studentProfile.major,
    //   photos: null
    // };
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { marginTop: this.props.navBarHeight, height: this.props.pageHeight }
        ]}
      >
        <ScrollView ref="scrollView">
          <Text style={[styles.header, GlobalStyles.text, styles.textListItem]}>
            Preferred First Name
          </Text>
          <View style={styles.line} />
          <TextInput
            style={[GlobalStyles.text, styles.textListItem, styles.textInput]}
            // onChangeText={(firstName) => this.setState({firstName})}
            value="{this.state.firstName}"
            maxLength={80}
            ref="firstName"
            // onFocus={this._inputFocused.bind(this, 'firstName')}
            // onSubmitEditing={() => this._focusNextField('lastName')}
            returnKeyType="next"
          />
          <View style={styles.line} />
          <Text style={[styles.header, GlobalStyles.text, styles.textListItem]}>
            Last Name
          </Text>
          <View style={styles.line} />
          <TextInput
            style={[GlobalStyles.text, styles.textListItem, styles.textInput]}
            // onChangeText={(lastName) => this.setState({lastName})}
            value="{this.state.lastName}"
            maxLength={80}
            ref="lastName"
            // onFocus={this._inputFocused.bind(this, 'lastName')}
            // onSubmitEditing={() => this._focusNextField('description')}
            returnKeyType="next"
          />
          <View style={styles.line} />
          <Text style={[styles.header, GlobalStyles.text, styles.textListItem]}>
            Bio
          </Text>
          <View style={styles.line} />
          <TextInput
            style={[
              GlobalStyles.text,
              styles.textListItem,
              styles.textInput,
              { height: 100, paddingTop: 5, paddingBottom: 5 }
            ]}
            // onChangeText={(description) => this.setState({description})}
            value="{this.state.description}"
            multiline={true}
            maxLength={500}
            ref="description"
            // onFocus={this._inputFocused.bind(this, 'description')}
          />
          <View style={styles.line} />
          <Text style={[styles.header, GlobalStyles.text, styles.textListItem]}>
            Major
          </Text>
          <View style={styles.line} />
          <TextInput
            style={[GlobalStyles.text, styles.textListItem, styles.textInput]}
            // onChangeText={(major) => this.setState({major})}
            value="{this.state.major}"
            maxLength={100}
            ref="major"
            // onFocus={this._inputFocused.bind(this, 'major')}
            returnKeyType="done"
          />
          <View style={styles.line} />
          <Text style={[styles.header, GlobalStyles.text, styles.textListItem]}>
            Tags / Interests
          </Text>
          <View style={styles.line} />
          <TouchableOpacity
            style={styles.tagButton}
            // onPress={this._showTagPage.bind(this)}
          >
            <Text
              style={[GlobalStyles.text, styles.textListItem, styles.tagText]}
            >
              {this.props.myProfile &&
              this.props.myProfile.tags &&
              this.props.myProfile.tags.length > 0
                ? this.props.myProfile.tags.join(", ")
                : "none (tap to add)"}
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <RectButton
            style={[styles.rectButton, styles.createAccountButton]}
            onPress={GlobalFunctions.openTOS}
            text="Privacy Policy / Terms of Service"
            textStyle={styles.buttonText}
          />
          <RectButton
            style={[styles.rectButton, styles.createAccountButton]}
            // onPress={this._createAccountOnPress.bind(this)}
            text="Create Account"
            textStyle={styles.buttonText}
          />
          <View style={styles.bottom}>
            <Text style={styles.aboutText}>
              JumboSmash was brought to you by:{"\n"}
              Devs: {GlobalFunctions.developers() + "\n"}
              Designers: {GlobalFunctions.designers() + "\n\n"}
              Special Thanks To:{"\n" + GlobalFunctions.helpers()}
            </Text>
          </View>
          <View style={styles.hiddenText}>
            <Text style={{ textAlign: "center" }}>🍆🍑</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  },
  textListItem: {
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 15
  },
  header: {
    paddingTop: 12,
    paddingBottom: 9,
    fontWeight: "600"
  },
  textInput: {
    height: 42,
    color: GlobalFunctions.style().darkGray
  },
  line: {
    height: 1,
    left: 0,
    right: 0,
    backgroundColor: GlobalFunctions.style().lightGray
  },
  tagText: {
    alignItems: "center",
    color: GlobalFunctions.style().darkGray,
    paddingTop: 10,
    paddingBottom: 10
  },
  bottom: {
    minHeight: 150,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 16
  },
  rectButton: {
    height: 70,
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 5
  },
  createAccountButton: {
    backgroundColor: GlobalFunctions.style().color
  },
  aboutText: {
    textAlign: "center",
    opacity: 0.5
  },
  hiddenText: {
    position: "absolute",
    bottom: -150,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "600"
  }
});
export default CreateProfilePage;
