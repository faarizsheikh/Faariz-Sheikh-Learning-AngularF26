// events-data.ts:

export interface statEvent {
  // Will be used for emitting and outputting:
  id: number;
  newStat: 'alive' | 'dead' | 'unknown';
  oldStat: 'alive' | 'dead' | 'unknown';
}
