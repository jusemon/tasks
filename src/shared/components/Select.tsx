import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Theme, Searchbar, Button, withTheme } from 'react-native-paper';
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
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.background
  },
  textInput: {
    backgroundColor: colors.primary
  },
  picker: {
    borderBottomColor: '#000',
    color: '#fff'
  },
  scroll: {
    backgroundColor: colors.background
  },
  firstItem: {
    borderTopColor: '#aaa',
    borderTopWidth: 1
  },
  item: {
    borderTopColor: '#aaa',
    borderTopWidth: 1,
    borderBottomColor: '#aaa',
    borderBottomWidth: 1
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
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={this.handleOnChangeTextSearch}
          value={this.state.query}
        />
        <ScrollView style={styles.scroll}>
          {this.state.items.map((item, index) => (
            <View key={index} style={index == 0 ? styles.firstItem : styles.item}>
              <Button mode="text" onPress={this.handleOnPress(item)}>
                {item.label}
              </Button>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default withTheme(Select);

