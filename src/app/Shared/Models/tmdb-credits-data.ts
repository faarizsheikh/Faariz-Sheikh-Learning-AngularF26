// TMDB CREDITS DATA INTERFACE (tmdb-credits-data.ts):

export interface TMDBCastMember {
  credit_id: string;
  id: number;
  name: string;
  character: string;
  order: number;
}

export interface TMDBCreditsResponse {
  id: number;
  cast: TMDBCastMember[];
}
