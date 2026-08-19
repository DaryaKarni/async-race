import { initRouter } from "./router/router";
import { store } from "./state/app-state";
import { initGarageControls, updateGarage, updateGarageState } from "./views/garage/build-garage";

function init(): void{
  initRouter();
}
init();
updateGarage();
initGarageControls();
store.subscribe(updateGarageState);