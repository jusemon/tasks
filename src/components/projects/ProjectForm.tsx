import React from "react";
import { View, StyleSheet } from "react-native";
import { withTheme, Theme, FAB } from "react-native-paper";

import Form, { FormField, FormFieldType } from "../../shared/components/Form";
import { ThemePropBase, NavigationPropBase } from "../../shared/base/types";
import firebaseApp from "../../shared/firebase";
import { Project } from "./model";
import { Team } from "../teams/model";

interface ProjectFormState {
  formFields: Array<FormField>;
  result: Project;
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
  state = {
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
    }, {
      fieldName: 'team',
      label: 'Team',
      type: FormFieldType.List,
      items: [],
      secureTextEntry: false,
      defaultValue: this.props.navigation.getParam('team', '')
    }],
    result: {
      name: this.props.navigation.getParam('name', ''),
      description: this.props.navigation.getParam('description', ''),
      team: this.props.navigation.getParam('team', '')
    }
  };

  componentWillMount() {
    firebaseApp.database().ref('teams').once('value', (values) => {
      const teams: Array<Team> = [];
      values.forEach(value => {
        teams.push({ ...value.val(), id: value.key });
      });
      const formField = this.state.formFields.find(formField => formField.fieldName == 'team');
      formField.items = teams.map(team => ({ label: team.name, value: team }));      
    });
  }

  handleOnChange = (result: any) => {
    this.setState({ result: result })
  }

  handleOnPress = () => {
    const id = this.props.navigation.getParam('id', null);
    if (id !== null) {
      firebaseApp.database().ref(`projects/${id}`).update(this.state.result);
    } else {
      firebaseApp.database().ref('projects').push(this.state.result);
    }
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
