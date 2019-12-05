import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, Theme, Button } from 'react-native-paper';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { MaterialIcons as IconComponent } from "@expo/vector-icons";

import { ThemePropBase, NavigationPropBase } from '../../shared/base/types';
import { ProfileButton } from '../profile/Profile';
import ProjectsList from './ProjectList';

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

interface ProjectsProps extends ThemePropBase, NavigationPropBase { }

export class Projects extends React.Component<ProjectsProps> {
  static navigationOptions = ({ navigation }: NavigationStackScreenProps) => {
    return {
      title: 'Projects',
      headerLeft: () => <ProfileButton navigation={navigation} />,
      headerRight: () => <Button onPress={() => {
        navigation.navigate('ProjectForm');
      }}><IconComponent name='add' size={25} color='white' /></Button>
    }
  }

  render() {
    const { container } = style(this.props.theme);
    return (
      <View style={container}>
        <ProjectsList theme={this.props.theme} navigation={this.props.navigation} />
      </View>
    );
  }
}

export default withTheme(Projects);
