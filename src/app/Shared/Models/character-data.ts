// CHARACTER DATA INTERFACE (character-data.ts):

export interface ExtraInfo {
  nickName?: string;
  quote?: string;
  age?: number;
  description?: string;
  imageLink?: string;
  status: boolean | null | undefined;
}

export interface Character extends ExtraInfo {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  played_by: string;
  character_type: string;
  description: string;
}
