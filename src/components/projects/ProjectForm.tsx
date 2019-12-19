import React from "react";
import { View, StyleSheet, RecyclerViewBackedScrollViewComponent } from "react-native";
import { withTheme, Theme, FAB } from "react-native-paper";

import Form, { FormField, FormFieldType } from "../../shared/components/Form";
import { ThemePropBase, NavigationPropBase } from "../../shared/base/types";
import firebaseApp from "../../shared/firebase";
import { Project } from "./model";
import { Team } from "../teams/model";

interface ProjectFormState {
  formFields: Array<FormField>;
  project: Project;
  projectOld?: Project;
}
interface ProjectFormProps extends ThemePropBase, NavigationPropBase { }

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

export class ProjectForm extends React.Component<ProjectFormProps, ProjectFormState> {
  state: ProjectFormState = {
    formFields: [{
      fieldName: 'name',
      label: 'Name',
      type: FormFieldType.Text,
      defaultValue: this.props.navigation.getParam('name', '')
    }, {
      fieldName: 'description',
      label: 'Description',
      type: FormFieldType.Text,
      defaultValue: this.props.navigation.getParam('description', '')
    }, {
      fieldName: 'team',
      label: 'Team',
      type: FormFieldType.List,
      items: [],
      defaultValue: this.props.navigation.getParam('team', { label: '' })
    }],
    project: {
      name: this.props.navigation.getParam('name', ''),
      description: this.props.navigation.getParam('description', ''),
      teamId: this.props.navigation.getParam('teamId', ''),
      team: null
    }
  };

  componentDidMount() {
    firebaseApp.database().ref('teams').once('value', (values) => {
      const obj = values.val();
      const teams = Object.keys(obj).map<Team>((id) => ({ ...obj[id], id }));
      const formFieldTeam = this.state.formFields.find(formField => formField.fieldName == 'team');
      formFieldTeam.items = teams.map(team => ({ label: team.name, value: team }));
      teams.find(team => team.name);
    });
    this.setState({ projectOld: { ...this.state.project } });
  }

  handleOnChange = (project: Project) => {
    if (project.team.value) {
      project.teamId = project.team.value.id;
    }
    this.setState({ project });
  }

  handleOnPress = () => {
    const id = this.props.navigation.getParam('id', null);
    const { project, projectOld } = this.state;
    delete project.team.value;
    const isEditing = id !== null;
    const key = isEditing ? id : firebaseApp.database().ref().child('projects').push().key;
    const updates = {};
    updates[`/projects/${key}`] = project;
    updates[`/teams/${project.teamId}/projects/${key}`] = true;
    if (isEditing && project.teamId !== projectOld.teamId) {
      updates[`/teams/${projectOld.teamId}/projects/${key}`] = false;
    }
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

export default withTheme(ProjectForm);
