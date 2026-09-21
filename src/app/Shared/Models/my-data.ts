export interface ExtraInfo {
  images?: string;
}

export interface MyData extends ExtraInfo {
  // The topic is: Characters from IT (2017) - Directed by Andrés Muschietti
  id: number;
  quote: string;
  name: string;
  gender: string;
  age: number;
  status_alive: boolean;
  played_by: string;
  character_type: string;
  description: string;
}
