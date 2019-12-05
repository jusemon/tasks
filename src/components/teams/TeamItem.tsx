import React from "react";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { Team } from "./model";

interface TeamItemProps {
  team: Team;
  onDelete: (id: string) => any;
  onEdit: (id: string) => any;
}

export default class TeamItem extends React.Component<TeamItemProps> {
  render() {
    return (
      <Card style={{ margin: 10, marginBottom: 0 }}>
        <Card.Content>
          <Title>{this.props.team.name}</Title>
          <Paragraph>{this.props.team.description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => this.props.onDelete(this.props.team.id)}>Delete</Button>
          <Button onPress={() => this.props.onEdit(this.props.team.id)}>Edit</Button>
        </Card.Actions>
      </Card>
    );
  }
}
