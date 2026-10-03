// status-event-data.ts:

export interface statEvent {
  // Will be used for emitting and outputting for the status toggle button:
  id: number;
  newStat: 'alive' | 'dead' | 'unknown';
  oldStat: 'alive' | 'dead' | 'unknown';
}
