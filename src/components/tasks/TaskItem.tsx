import React from "react";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { Task } from "./model";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => any;
  onEdit: (id: string) => any;
}

export default class TaskItem extends React.Component<TaskItemProps> {
  render() {
    return (
      <Card style={{ margin: 10, marginBottom: 0 }}>
        <Card.Content>
          <Paragraph>{this.props.task.name}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => this.props.onDelete(this.props.task.id)}>Delete</Button>
          <Button onPress={() => this.props.onEdit(this.props.task.id)}>Edit</Button>
        </Card.Actions>
      </Card>
    );
  }
}
