import { Team } from "../teams/model";
import { SelectItem } from "../../shared/components/Select";

export interface Project {
  id?: string;
  name: string;
  description: string;
  teamId: string;
  team?: SelectItem<Team>;
}
