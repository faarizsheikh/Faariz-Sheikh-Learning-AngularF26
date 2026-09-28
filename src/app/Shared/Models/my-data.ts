// my-data.ts:

export interface ExtraInfo {
  images?: string;
  status?: boolean;
}

export interface Characters extends ExtraInfo {
  // The topic is: Characters from IT (2017) - Directed by Andrés Muschietti
  id: number;
  name: string;
  quote: string;
  age: number | string;
  gender: string;
  played_by: string;
  character_type: string;
  description: string;
}
