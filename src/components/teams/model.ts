export interface Team {
  id?: string;
  name: string;
  description: string;
  projects?: {
    [id: string]: boolean
  }
}
