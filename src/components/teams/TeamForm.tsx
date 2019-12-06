import React from "react";
import { View, StyleSheet } from "react-native";
import { withTheme, Theme, FAB } from "react-native-paper";

import Form, { FormField, FormFieldType } from "../../shared/components/Form";
import { ThemePropBase, NavigationPropBase } from "../../shared/base/types";
import firebaseApp from "../../shared/firebase";
import { Team } from "./model";
import { Project } from "../projects/model";

interface TeamFormState {
  formFields: Array<FormField>;
  team: Team;
  teamOld?: Team;
}
interface TeamFormProps extends ThemePropBase, NavigationPropBase { }

const style = ({ colors }: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.primary
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});

export class TeamForm extends React.Component<TeamFormProps, TeamFormState> {
  state: TeamFormState = {
    formFields: [{
      fieldName: 'name',
      label: 'Name',
      type: FormFieldType.Text,
      secureTextEntry: false,
      defaultValue: this.props.navigation.getParam('name', '')
    }, {
      fieldName: 'description',
      label: 'Description',
      type: FormFieldType.Text,
      secureTextEntry: false,
      defaultValue: this.props.navigation.getParam('description', '')
    }],
    team: {
      name: this.props.navigation.getParam('name', ''),
      description: this.props.navigation.getParam('description', ''),
      projects: this.props.navigation.getParam('projects', {})
    }
  };

  componentWillMount() {
    this.setState({ teamOld: { ...this.state.team } });
  }

  handleOnChange = (result: any) => {
    this.setState({ team: result })
  }

  handleOnPress = () => {
    const id = this.props.navigation.getParam('id', null);
    const { team, teamOld } = this.state;
    const isEditing = id !== null;
    const key = isEditing ? id : firebaseApp.database().ref().child('teams').push().key;    const updates = {};
    if (isEditing && Object.values(teamOld.projects || {}).some(v => v)) {
      team.projects = teamOld.projects;
      Object.keys(team.projects).forEach(projectKey => {
        updates[`/projects/${projectKey}/team`] = { label: team.name };
      });
    }
    updates[`/teams/${key}`] = team;
    firebaseApp.database().ref().update(updates);
    this.props.navigation.goBack();
  }

  render() {
    const styles = style(this.props.theme);
    return (
      <View style={styles.container}>
        <Form
          formFields={this.state.formFields}
          theme={this.props.theme}
          handleOnChange={this.handleOnChange}
        />
        <FAB
          style={styles.fab}
          icon="check"
          onPress={this.handleOnPress} />
      </View>
    );
  }
}

export default withTheme(TeamForm);
