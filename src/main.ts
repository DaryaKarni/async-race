import { initRouter } from "./router/router";
import { store } from "./state/app-state";
import { initGarageControls, updateGarage, updateGarageState } from "./views/garage/build-garage";
import { updateWinners } from "./views/winners/build-winners";

function init(): void{
  initRouter();
}
init();
updateGarage();
updateWinners();
initGarageControls();
store.subscribe(updateGarageState);
