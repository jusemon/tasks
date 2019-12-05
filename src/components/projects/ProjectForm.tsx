import React from "react";
import { View, StyleSheet } from "react-native";
import { withTheme, Theme, FAB } from "react-native-paper";

import Form, { FormField } from "../../shared/components/Form";
import { ThemePropBase, NavigationPropBase } from "../../shared/base/types";
import firebaseApp from "../../shared/firebase";
import { Project } from "./model";

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
      secureTextEntry: false,
      defaultValue: this.props.navigation.getParam('name', '')
    }, {
      fieldName: 'description',
      label: 'Description',
      secureTextEntry: false,
      defaultValue: this.props.navigation.getParam('description', '')
    }],
    result: {
      name: this.props.navigation.getParam('name', ''),
      description: this.props.navigation.getParam('description', '')
    }
  };

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
