import React from 'react';
import { withTheme, Theme, FAB, Portal, Dialog } from 'react-native-paper';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { MaterialIcons as IconComponent } from "@expo/vector-icons";

import { ThemePropBase, NavigationPropBase } from '../../shared/base/types';
import { ProfileButton } from '../profile/Profile';
import firebaseApp from '../../shared/firebase';
import { NavigationStackScreenProps } from 'react-navigation-stack';

const style = ({ colors }: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: colors.background
  },
  scroll: {
    backgroundColor: colors.background
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});

export interface Team {
  id?: string;
  name: string;
  description: string;
}

interface TeamElemenProps {
  team: Team;
  onDelete: (id: string) => any;
  onEdit: (id: string) => any;
}

export class TeamElement extends React.Component<TeamElemenProps> {
  render() {
    return (
      <Card style={{ margin: 10, marginBottom: 0 }}>
        <Card.Content>
          <Title>{this.props.team.name}</Title>
          <Paragraph>{this.props.team.description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => this.props.onDelete(this.props.team.id)}>Delete</Button>
          <Button onPress={() => this.props.onEdit(this.props.team.id)}>Edit</Button>
        </Card.Actions>
      </Card>
    );
  }
}

interface TeamsListState {
  teams: Array<Teams>;
  visible: boolean;
  id: string;
}
interface TeamsListProps extends ThemePropBase, NavigationPropBase { }

export class TeamsList extends React.Component<TeamsListProps, TeamsListState> {
  onValueChange: any;
  state = {
    teams: [],
    visible: false,
    id: null
  }

  componentWillMount() {
    this.onValueChange = firebaseApp.database().ref('teams').on('value', (values) => {
      const list: Array<any> = [];
      values.forEach(value => {
        list.push({ ...value.val(), id: value.key });
      });
      this.setState({ teams: list });
    });
  }

  componentWillUnmount() {
    this.onValueChange.off()
  }

  private onEdit = (id: string) => this.props.navigation.navigate('TeamForm', { id });

  private onDelete = () => {
    firebaseApp.database().ref(`teams/${this.state.id}`).remove();
    this.hideDeleteDialog();
  }

  private showDeleteDialog = (id: string) => this.setState({ visible: true, id });

  private hideDeleteDialog = () => this.setState({ visible: false });

  render() {
    const styles = style(this.props.theme);
    return (
      <>
        <ScrollView style={styles.scroll}>
          {this.state.teams.map(team => (
            <TeamElement
              key={team.id}
              team={team}
              onEdit={this.onEdit}
              onDelete={this.showDeleteDialog}
            />
          ))}
        </ScrollView>

        <Portal>
          <Dialog
            visible={this.state.visible}
            onDismiss={this.hideDeleteDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Are you sure you want to delete the team?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this.hideDeleteDialog}>Cancel</Button>
              <Button onPress={this.onDelete}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </>
    );
  }
}

interface TeamsProps extends ThemePropBase, NavigationPropBase { }

export class Teams extends React.Component<TeamsProps> {
  static navigationOptions = ({ navigation }: NavigationStackScreenProps) => {
    return {
      title: 'Teams',
      headerLeft: () => <ProfileButton navigation={navigation} />,
      headerRight: () => <Button onPress={() => {
        console.log('On Press', navigation.navigate('TeamForm'));
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
