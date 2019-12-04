import React from 'react';
import { Text, withTheme, Theme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { ThemePropBase } from '../../shared/base/types';

const style = ({ colors }: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.background
  }
});

export class Teams extends React.Component<ThemePropBase> {
  static navigationOptions = {
    title: 'Teams'
  }

  render() {
    const { container } = style(this.props.theme);
    return (
      <View style={container}>
        <Text>Teams Screen</Text>
      </View>
    );
  }
}

export default withTheme(Teams);