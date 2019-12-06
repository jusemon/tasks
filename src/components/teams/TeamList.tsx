import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Paragraph, Portal, Dialog, Button, Theme } from "react-native-paper";

import { ThemePropBase, NavigationPropBase } from "../../shared/base/types";
import firebaseApp from "../../shared/firebase";
import TeamItem from "./TeamItem";
import { Team } from "./model";

const style = ({ colors }: Theme) => StyleSheet.create({
  scroll: {
    backgroundColor: colors.background
  }
});

interface TeamsListState {
  teams: Array<Team>;
  visible: boolean;
  id: string;
}
interface TeamsListProps extends ThemePropBase, NavigationPropBase { }

export default class TeamsList extends React.Component<TeamsListProps, TeamsListState> {
  onValueChange: any;
  state = {
    teams: [],
    visible: false,
    id: null
  }

  componentWillMount() {
    this.onValueChange = firebaseApp.database().ref('teams').on('value', (values) => {
      const obj = values.val() || {};
      const teams = Object.keys(obj).map<Team>((id) => ({ ...obj[id], id }));
      this.setState({ teams });
    });
  }

  componentWillUnmount() {
    this.onValueChange.off()
  }

  private onEdit = (id: string) => this.props.navigation.navigate('TeamForm', { ...this.state.teams.find(team => team.id === id) });

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
            <TeamItem
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
