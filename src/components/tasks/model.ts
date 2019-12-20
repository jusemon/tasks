import { SelectItem } from "../../shared/components/Select";
import { Team } from "../teams/model";
import { Project } from "../projects/model";

export interface Task {
  id?: string;
  name: string;
  teamId: string;
  team?: SelectItem<Team>;
  projectId: string;
  project?: SelectItem<Project>;
  startDate: string,
  endDate: string
}
