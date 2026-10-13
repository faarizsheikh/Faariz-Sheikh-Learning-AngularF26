// STATUS EVENT DATA INTERFACE (status-event-data.ts):

export interface statEvent {
  // Will be used for emitting and outputting for the status toggle button:
  id: number;
  oldStat: 'Alive' | 'Dead' | 'Unknown';
  newStat: 'Alive' | 'Dead' | 'Unknown';
}
