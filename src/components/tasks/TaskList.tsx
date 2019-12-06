import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Paragraph, Portal, Dialog, Button, Theme } from "react-native-paper";

import { ThemePropBase, NavigationPropBase } from "../../shared/base/types";
import firebaseApp from "../../shared/firebase";
import TaskItem from "./TaskItem";
import { Task } from "./model";

const style = ({ colors }: Theme) => StyleSheet.create({
  scroll: {
    backgroundColor: colors.background
  }
});

interface TasksListState {
  tasks: Array<Task>;
  visible: boolean;
  id: string;
}
interface TasksListProps extends ThemePropBase, NavigationPropBase { }

export default class TasksList extends React.Component<TasksListProps, TasksListState> {
  onValueChange: any;
  state: TasksListState = {
    tasks: [],
    visible: false,
    id: null
  }

  componentWillMount() {
    this.onValueChange = firebaseApp.database().ref('tasks').on('value', (values) => {
      const obj = values.val() || {};
      const tasks = Object.keys(obj).map<Task>((id) => ({ ...obj[id], id }));
      this.setState({ tasks });
    });
  }

  componentWillUnmount() {
    this.onValueChange.off()
  }

  private onEdit = (id: string) => this.props.navigation.navigate('TaskForm', { ...this.state.tasks.find(task => task.id === id) });

  private onDelete = () => {
    firebaseApp.database().ref(`tasks/${this.state.id}`).remove();
    this.hideDeleteDialog();
  }

  private showDeleteDialog = (id: string) => this.setState({ visible: true, id });

  private hideDeleteDialog = () => this.setState({ visible: false });

  render() {
    const styles = style(this.props.theme);
    return (
      <>
        <ScrollView style={styles.scroll}>
          {this.state.tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
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
              <Paragraph>Are you sure you want to delete the task?</Paragraph>
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
