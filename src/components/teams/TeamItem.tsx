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
    const { team, onEdit, onDelete } = this.props;
    const disabled = team.projects && Object.values(team.projects).some(v => v);
    return (
      <Card style={{ margin: 10, marginBottom: 0 }}>
        <Card.Content>
          <Title>{team.name}</Title>
          <Paragraph>{team.description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button disabled={disabled} onPress={() => onDelete(team.id)}>Delete</Button>
          <Button onPress={() => onEdit(this.props.team.id)}>Edit</Button>
        </Card.Actions>
      </Card>
    );
  }
}
