import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { separator } from "../../shared/styles";
import * as WebBrowser from "expo-web-browser";
import Template from "../../container/Template/Template";
import { Toolbar } from "react-native-material-ui";
import { VERSION } from "../../db";

import { connect } from "react-redux";

const about = props => {
  const openWebBrowser = async () => {
    await WebBrowser.openBrowserAsync("ronengoren.com");
  };

  return (
    <Template>
      <Toolbar
        leftElement="arrow-back"
        onLeftElementPress={() => {
          props.navigation.goBack();
        }}
        centerElement={props.translations.title}
      />
      <View style={styles.container}>
        <ScrollView>
          <Image
            style={styles.logo}
            source={require("../../assets/images/icon.png")}
          />
          <Text style={separator} />
          <Text style={[styles.primaryText, { color: props.theme.textColor }]}>
            {props.translations.primaryText}
          </Text>
          <Text
            style={[styles.secondaryText, { color: props.theme.textColor }]}
          >
            {props.translations.secondaryText}
          </Text>
          <TouchableOpacity onPress={openWebBrowser}>
            <Image
              tintColor={props.theme.textColor}
              style={styles.github}
              source={require("../../assets/images/github.png")}
            />
          </TouchableOpacity>
        </ScrollView>
        <View style={{ opacity: 0.5 }}>
          <Text style={[styles.copy, { color: props.theme.textColor }]}>
            &copy; by Mateusz Pijanowski (WebStrong team) v.{VERSION}
          </Text>
        </View>
      </View>
    </Template>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  primaryText: {
    fontSize: 15,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  secondaryText: {
    fontSize: 13,
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 5
  },
  copy: {
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    opacity: 0.5,
    fontSize: 10
  },
  logo: {
    height: 150,
    width: 150,
    borderRadius: 65,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center"
  },
  github: {
    height: 125,
    width: 125,
    opacity: 0.5,
    borderRadius: 65,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center"
  }
});

const mapStateToProps = state => {
  return {
    theme: state.theme.theme,
    translations: state.settings.translations.About
  };
};

export default connect(mapStateToProps)(about);
