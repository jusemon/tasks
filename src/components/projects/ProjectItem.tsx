import React from "react";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { Project } from "./model";

interface ProjectItemProps {
  project: Project;
  onDelete: (id: string) => any;
  onEdit: (id: string) => any;
}

export default class ProjectItem extends React.Component<ProjectItemProps> {
  render() {
    return (
      <Card style={{ margin: 10, marginBottom: 0 }}>
        <Card.Content>
          <Paragraph>{this.props.project.team.label}</Paragraph>
          <Title>{this.props.project.name}</Title>
          <Paragraph>{this.props.project.description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => this.props.onDelete(this.props.project.id)}>Delete</Button>
          <Button onPress={() => this.props.onEdit(this.props.project.id)}>Edit</Button>
        </Card.Actions>
      </Card>
    );
  }
}
