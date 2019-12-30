import React from "react";
import { FlatList, View, Text } from "react-native";
import Footer from "./Footer";
import Item from "./Item";

class ListFeed extends React.Component {
  renderItem = ({ item }) => <Item {...item} />;
  keyExtractor = item => item.key;
  render() {
    const { onPressFooter, ...props } = this.props;

    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        ListFooterComponent={footerProps => (
          <Footer {...footerProps} onPress={onPressFooter} />
        )}
        renderItem={this.renderItem}
        {...props}
      />
    );
  }
}
export default ListFeed;
