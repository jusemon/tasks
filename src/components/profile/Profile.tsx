import React from "react";
import { Button, Theme, withTheme, Text } from "react-native-paper";
import { NavigationPropBase, ThemePropBase } from "../../shared/base/types";
import { MaterialIcons as IconComponent } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

export class ProfileButton extends React.Component<NavigationPropBase> {

  private handleOnPress = () => this.props.navigation.navigate('Profile');

  render() {
    return (
      <Button
        theme={{ colors: { primary: '#fff' } }}
        onPress={this.handleOnPress}>
        <IconComponent name='person' size={25} color='white' />
      </Button>);
  }
}

const style = ({ colors }: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.background
  }
});

class Profile extends React.Component<ThemePropBase> {
  static navigationOptions = {
    title: 'Profile'
  }

  render() {
    const { container } = style(this.props.theme);
    return (
      <View style={container}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}

export default withTheme(Profile);
