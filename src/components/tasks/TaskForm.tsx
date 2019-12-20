import React from "react";
import { View, StyleSheet } from "react-native";
import { withTheme, Theme, FAB } from "react-native-paper";

import FormComponent, { FormField, FormFieldType, Form } from "../../shared/components/Form";
import { ThemePropBase, NavigationPropBase } from "../../shared/base/types";
import firebaseApp from "../../shared/firebase";
import { Task } from "./model";
import { Team } from "../teams/model";
import { SelectItem } from "../../shared/components/Select";
import { Project } from "../projects/model";

interface TaskFormState {
  formFields: Array<FormField>;
  task: Task;
  taskOld?: Task;
  projects: Array<SelectItem<Project>>;
  teams: Array<SelectItem<Team>>
}
interface TaskFormProps extends ThemePropBase, NavigationPropBase { }

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

export class TaskForm extends React.Component<TaskFormProps, TaskFormState> {
  form: Form;

  constructor(props: TaskFormProps) {
    super(props);

    const task: Task = {
      name: this.props.navigation.getParam('name', ''),
      teamId: this.props.navigation.getParam('teamId', ''),
      team: this.props.navigation.getParam('team', { label: '' }),
      projectId: this.props.navigation.getParam('projectId', ''),
      project: this.props.navigation.getParam('project', { label: '' }),
      startDate: this.props.navigation.getParam('startDate', null),
      endDate: this.props.navigation.getParam('endDate', null)
    };

    this.state = {
      formFields: [{
        fieldName: 'name',
        label: 'Name',
        type: FormFieldType.Text,
        defaultValue: task.name
      }, {
        fieldName: 'team',
        label: 'Team',
        type: FormFieldType.List,
        items: [],
        callback: this.handleOnSelectTeam,
        defaultValue: task.team
      }, {
        fieldName: 'project',
        label: 'Project',
        items: [],
        type: FormFieldType.List,
        defaultValue: task.project
      }, {
        fieldName: 'startDate',
        label: 'Start date',
        type: FormFieldType.DateTime,
        defaultValue: task.startDate,
        mode: "date"
      }, {
        fieldName: 'endDate',
        label: 'End date',
        type: FormFieldType.DateTime,
        defaultValue: task.endDate,
        mode: "date"
      }],
      task,
      projects: [],
      teams: []
    };
  }

  componentDidMount() {
    firebaseApp.database().ref('teams').once('value', (values) => {
      const obj = values.val();
      const teams = Object.keys(obj).map<Team>((id) => ({ ...obj[id], id })).map<SelectItem<Team>>(team => ({ label: team.name, value: team }));
      const formFieldTeam = this.state.formFields.find(formField => formField.fieldName == 'team');
      if (formFieldTeam.type == FormFieldType.List) {
        formFieldTeam.items = teams;
      }
      this.setState({ teams });
    });

    firebaseApp.database().ref('projects').once('value', (values) => {
      const obj = values.val();
      const projects = Object.keys(obj).map<Project>((id) => ({ ...obj[id], id })).map<SelectItem<Project>>(team => ({ label: team.name, value: team }));
      this.setState({ projects });
    });

    this.setState({ taskOld: { ...this.state.task } });
  }

  handleOnSelectTeam = (item: SelectItem<Team>, previous: SelectItem<Team>) => {
    if (previous.value && item.value.id == previous.value.id) {
      return;
    }
    const { projects, formFields } = this.state;
    const projectIds = Object.keys(item.value.projects);
    const formField = formFields.find(formField => formField.fieldName == 'project');
    if (formField.type == FormFieldType.List) {
      formField.items = projects.filter(p => projectIds.includes(p.value.id));
      this.form.handleOnChangeText(formField)(formField.defaultValue);
    }
  }

  handleOnChange = (task: Task) => {
    if (task.team.value) {
      task.teamId = task.team.value.id;
    }
    if (task.project.value) {
      task.projectId = task.project.value.id;
    }
    this.setState({ task });
  }

  handleOnPress = () => {
    const id = this.props.navigation.getParam('id', null);
    if (id !== null) {
      firebaseApp.database().ref(`tasks/${id}`).update(this.state.task);
    } else {
      firebaseApp.database().ref('tasks').push(this.state.task);
    }
    this.props.navigation.goBack();
  }

  render() {
    const styles = style(this.props.theme);
    return (
      <View style={styles.container}>
        <FormComponent
          onRef={ref => this.form = ref}
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

export default withTheme(TaskForm);
