import { getWinners } from "../../api/winners";
import { store } from "../../state/app-state";
import { State} from "../../state/types";
import { renderWinnerField } from "./winner-field";

export async function updateWinners(): Promise<void> {
  const object = await getWinners();
  const arrayWinners = object.items;
  const totalWinners = object.count;
  for(const winner of arrayWinners){
    renderWinnerField(winner);
  }
  store.dispatch((previousState: State) => {
    return {
    ...previousState,
    winnersCount: Number(totalWinners),
    }
  });
  const countText = document.querySelector('#winners-number');
  if(countText){
    countText.textContent = String(totalWinners);
  }
}

const spanWinnersPage = document.querySelector('#winners-page-number');
const countText = document.querySelector('#winners-number');
function updateWinnersState(state: State){
  if(spanWinnersPage){
    spanWinnersPage.textContent = String(state.winnerPage);
  }
  if(countText){
    countText.textContent = String(state.winnersCount);
  }
}
export function switchToWinners(){
  updateWinnersState(store.getState());
}