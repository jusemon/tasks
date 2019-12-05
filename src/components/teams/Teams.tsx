import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, Theme, Button } from 'react-native-paper';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { MaterialIcons as IconComponent } from "@expo/vector-icons";

import { ThemePropBase, NavigationPropBase } from '../../shared/base/types';
import { ProfileButton } from '../profile/Profile';
import TeamsList from './TeamList';

const style = ({ colors }: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.background
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});

interface TeamsProps extends ThemePropBase, NavigationPropBase { }

export class Teams extends React.Component<TeamsProps> {
  static navigationOptions = ({ navigation }: NavigationStackScreenProps) => {
    return {
      title: 'Teams',
      headerLeft: () => <ProfileButton navigation={navigation} />,
      headerRight: () => <Button onPress={() => {
        navigation.navigate('TeamForm');
      }}><IconComponent name='add' size={25} color='white' /></Button>
    }
  }

  render() {
    const { container } = style(this.props.theme);
    return (
      <View style={container}>
        <TeamsList theme={this.props.theme} navigation={this.props.navigation} />
      </View>
    );
  }
}

export default withTheme(Teams);
