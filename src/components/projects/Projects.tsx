import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme, withTheme } from 'react-native-paper';
import { ThemePropBase } from '../../shared/base/types';

const style = ({ colors }: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.background
  }
});

export class Projects extends React.Component<ThemePropBase> {
  static navigationOptions = {
    title: 'Projects'
  }

  render() {
    const { container } = style(this.props.theme);
    return (
      <View style={container}>
        <Text>Projects Screen</Text>
      </View>
    );
  }
}

export default withTheme(Projects);
