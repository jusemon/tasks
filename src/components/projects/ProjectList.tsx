import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Paragraph, Portal, Dialog, Button, Theme } from "react-native-paper";

import { ThemePropBase, NavigationPropBase } from "../../shared/base/types";
import firebaseApp from "../../shared/firebase";
import ProjectItem from "./ProjectItem";
import { Project } from "./model";

const style = ({ colors }: Theme) => StyleSheet.create({
  scroll: {
    backgroundColor: colors.background
  }
});

interface ProjectsListState {
  projects: Array<Project>;
  visible: boolean;
  id: string;
}
interface ProjectsListProps extends ThemePropBase, NavigationPropBase { }

export default class ProjectsList extends React.Component<ProjectsListProps, ProjectsListState> {
  onValueChange: any;
  state: ProjectsListState = {
    projects: [],
    visible: false,
    id: null
  }

  componentDidMount() {
    this.onValueChange = firebaseApp.database().ref('projects').on('value', (values) => {
      const obj = values.val() || {};
      const projects = Object.keys(obj).map<Project>((id) => ({ ...obj[id], id }));
      this.setState({ projects });
    });
  }

  componentWillUnmount() {
    this.onValueChange.off()
  }

  private onEdit = (id: string) => this.props.navigation.navigate('ProjectForm', { ...this.state.projects.find(project => project.id === id) });

  private onDelete = () => {
    firebaseApp.database().ref(`projects/${this.state.id}`).remove();
    this.hideDeleteDialog();
  }

  private showDeleteDialog = (id: string) => this.setState({ visible: true, id });

  private hideDeleteDialog = () => this.setState({ visible: false });

  render() {
    const styles = style(this.props.theme);
    return (
      <>
        <ScrollView style={styles.scroll}>
          {this.state.projects.map(project => (
            <ProjectItem
              key={project.id}
              project={project}
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
              <Paragraph>Are you sure you want to delete the project?</Paragraph>
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
