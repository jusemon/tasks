import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, ScrollView, TouchableHighlight, Text } from 'react-native';
import { Theme, Searchbar, withTheme } from 'react-native-paper';
import { ThemePropBase, NavigationPropBase } from '../base/types';

export interface SelectItem<T> {
  label: string,
  value: T
}

export interface SelectProps extends ThemePropBase, NavigationPropBase { }

export interface SelectState<T> {
  items: Array<SelectItem<T>>;
  query: string;
}

const style = ({ colors }: Theme) => StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: colors.primary
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingLeft: 10,
    paddingRight: 10
  },
  scroll: {
    backgroundColor: colors.primary,
  },
  firstItem: {
    borderTopColor: '#333',
    borderTopWidth: .7,
    borderBottomColor: '#333',
    borderBottomWidth: .7
  },
  item: {
    borderBottomColor: '#333',
    borderBottomWidth: .7
  },
  itemText: {
    color: '#fff',
    textAlign: "left",
    textAlignVertical: "center",
    minHeight: 50,
    fontSize: 16
  }
});

class Select<T> extends React.Component<SelectProps, SelectState<T>> {
  state = {
    items: this.props.navigation.getParam('items', []) as Array<SelectItem<T>>,
    query: ''
  };

  private handleOnChangeTextSearch = (text: string) => {
    const items = this.props.navigation.getParam('items', []) as Array<SelectItem<T>>;
    this.setState({ query: text, items: items.filter(item => item.label.toUpperCase().indexOf(text.toUpperCase()) > -1) });
  }

  private handleOnPress(item: SelectItem<T>): () => void {
    return () => {
      this.props.navigation.getParam('handleOnSelect')(item);
      this.props.navigation.goBack();
    };
  }

  render() {
    const styles = style(this.props.theme);
    return (
      <>
        <View style={styles.statusBar}></View>
        <View style={styles.container}>
          <Searchbar
            placeholder="Search"
            onChangeText={this.handleOnChangeTextSearch}
            value={this.state.query}
          />
          <ScrollView style={styles.scroll}>
            {this.state.items && this.state.items.map((item, index) => (
              <TouchableHighlight onPress={this.handleOnPress(item)} key={index} style={index == 0 ? styles.firstItem : styles.item}>
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableHighlight>
            ))}
          </ScrollView>
        </View>
      </>
    );
  }
}

export default withTheme(Select);

