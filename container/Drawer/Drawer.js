import React, { Component } from "react";
import { Drawer, Toolbar } from "react-native-material-ui";
import Template from "../Template/Template";
// import { BannerAd } from "../../../adsAPI";

import { connect } from "react-redux";

class DrawerContainer extends Component {
  render() {
    const { navigation, theme, translations } = this.props;

    return (
      <Template bgColor={theme.secondaryBackgroundColor}>
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement={translations.back}
        />
        <Drawer
          style={{
            container: { backgroundColor: theme.secondaryBackgroundColor }
          }}
        >
          <Drawer.Section
            divider
            style={{
              container: { backgroundColor: theme.secondaryBackgroundColor }
            }}
            items={[
              {
                icon: "bookmark-border",
                value: translations.categories,
                onPress: () => navigation.navigate("CategoriesList")
              },
              {
                icon: "people",
                value: translations.profile,
                onPress: () => navigation.navigate("Profile")
              }
            ]}
          />
          <Drawer.Section
            title="App"
            style={{
              container: { backgroundColor: theme.secondaryBackgroundColor }
            }}
            items={[
              {
                icon: "assessment",
                value: translations.themes,
                onPress: () => navigation.navigate("Themes")
              },
              {
                icon: "settings",
                value: translations.settings,
                onPress: () => navigation.navigate("Settings")
              },
              {
                icon: "backup",
                value: translations.backups,
                onPress: () => navigation.navigate("Backups")
              },
              {
                icon: "info",
                value: translations.about,
                onPress: () => navigation.navigate("About")
              }
            ]}
          />
        </Drawer>
        {/* <BannerAd /> */}
      </Template>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme.theme,
    translations: state.settings.translations.Drawer
  };
};

export default connect(mapStateToProps)(DrawerContainer);
