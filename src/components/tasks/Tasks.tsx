import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme, withTheme } from 'react-native-paper';
import { ThemePropBase } from '../../shared/base/types';
import { ProfileButton } from '../profile/Profile';

const style = ({ colors }: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.background
  }
});

class Tasks extends React.Component<ThemePropBase> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Tasks',
      headerLeft: () => <ProfileButton navigation={navigation} />
    }
  }

  render() {
    const { container } = style(this.props.theme);
    return (
      <View style={container}>
        <Text>Tasks Screen</Text>
      </View>
    );
  }
}

export default withTheme(Tasks);
