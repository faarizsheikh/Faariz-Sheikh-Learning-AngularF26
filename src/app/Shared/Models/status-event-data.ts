// status-event-data.ts:

export interface statEvent {
  // Will be used for emitting and outputting for the status toggle button:
  id: number;
  newStat: 'Alive' | 'Dead' | 'Unknown';
  oldStat: 'Alive' | 'Dead' | 'Unknown';
}
