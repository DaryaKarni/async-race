//Car, Winner, RaceResult interfaces
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

export type View = 'garage' | 'winners';
export interface State {
  view: View,
  garagePage: number,
  winnerPage: number,
  createInput: string,
  updateInput: string,
  createColor: string,
  updateColor: string,
  carsCount: number,
  winnersCount: number,
  selectedId: number | null,
  tableNumber: number,
  winners: Winner[],
}
export interface Car {
  name: string,
  color: string,
  id: number,
}
export interface Data<T> {
  items: T[],
  count: number,
}
export interface DataParameters{
  name: string,
  color: string,
}
export interface WinnerDataParameters{
  id: number,
  wins: number,
  time: number
}
export type sort = 'id' | 'wins' | 'time';
export type order = 'ASC' | 'DESC';