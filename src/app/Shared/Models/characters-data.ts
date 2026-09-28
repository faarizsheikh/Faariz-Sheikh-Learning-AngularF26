// characters-data.ts:

export interface ExtraInfo {
  status?: boolean;
}

export interface Characters extends ExtraInfo {
  id: number;
  name: string;
  imageLink: string;
  quote: string;
  age: number | string;
  gender: string;
  played_by: string;
  character_type: string;
  description: string;
}
