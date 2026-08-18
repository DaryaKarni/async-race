// Car, Winner, RaceResult interfaces
export interface Car {
  name: string,
  color: string,
  id: number,
}
export interface Winner {
  id: number,
  wins: number,
  time: number,
}
export interface RaceResult {
  
}
export type View = 'garage' | 'winners';
export interface State {
  view: View,
  garagePage: number,
  winnerPage: number,
}
