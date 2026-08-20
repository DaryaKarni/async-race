import { createCar, getCars, removeCar, updateCar } from "../../api/garage"
import { removeWinner } from "../../api/winners";

import { store } from "../../state/app-state";
import { Car, State } from "../../state/types";
import { removeWinnerField } from "../winners/winner-field";
import { renderCarTrack} from "./car-card";

export async function updateGarage(page: number = 1, limit: number = 7): Promise<void> {
  const container = document.querySelector('.cars-container');
  container?.replaceChildren();
  const object = await getCars(page, limit);
  const cars = object.items;
  const count: number = Number(object.count);
  store.dispatch((previousState) => {
    return {...previousState, selectedId: null};
  });
  for(const car of cars){
    renderCarTrack(car);
  }
  store.dispatch((previousState: State) => {
    return {
    ...previousState,
    carsCount: count,
    }
  });
}
const panel = document.querySelector('#panel');
const inputCreate = panel?.querySelector('#create-input');
const inputUpdate = panel?.querySelector('#update-input');
const colorCreate = panel?.querySelector('#create-color');
const colorUpdate = panel?.querySelector('#update-color');
const spanPageNumber = document.querySelector('#garage-page-number');
const countText = document.querySelector('#cars-number');
  
export function updateGarageState(state: State) {
  if(inputCreate instanceof HTMLInputElement){
    inputCreate.value = state.createInput;
  }
  if(inputUpdate instanceof HTMLInputElement){
    inputUpdate.value = state.updateInput;
  }
  if(colorCreate instanceof HTMLElement){
    colorCreate.style.backgroundColor = state.createColor;
  }
  if(colorUpdate instanceof HTMLElement){
    colorUpdate.style.backgroundColor = state.updateColor;
  }
  if(spanPageNumber){
    spanPageNumber.textContent = String(state.garagePage);
  }
  if(countText){
    countText.textContent = String(state.carsCount);
  }
}

function debounce<A extends unknown[]>(
  function_: (...arguments_: A) => void,
  delay: number
  ): (...arguments_: A) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...arguments_: A) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      function_(...arguments_);
    }, delay);
  };
}
function inputHandler(event: Event): State | undefined{
    const target = event.target;
    if(!(target instanceof HTMLInputElement)) return;
    store.dispatch((previousState: State) => {
      switch(target.id){
        case "create-input": {
          return {...previousState, createInput: target.value};
        }
        case "update-input": {
          return {...previousState, updateInput: target.value};
        }
        case "create-color": {
          return {...previousState, createColor: target.value};
        }
        case "update-color": {
          return {...previousState, updateColor: target.value};
        }
        default: {
          return previousState;
        }
      }
    });
  };
async function createCarHandler(state: State): Promise<void>{
  if(inputCreate instanceof HTMLInputElement){
    inputCreate.value = '';
    inputCreate.dispatchEvent(new Event('input', {bubbles: true}));
  }
  const car: Car | undefined = await createCar({
    name: state.createInput,
    color: state.createColor,
  });
  if (car) await updateGarage(state.garagePage);
  store.dispatch((previousState) => {
    return {...previousState, carsCount: state.carsCount + 1};
  });
}
async function updateCarHandler(state: State): Promise<void>{
  if(state.selectedId === null) return;
  const updatedCar = await updateCar(state.selectedId, {name: state.updateInput, color: state.updateColor});
  if(updatedCar) await updateGarage(state.garagePage);
    store.dispatch((previousState) => {
    return {...previousState, selectedId: null};
  });
}
const randomCarNames = ['Toyota','Ford','BMW','Honda','Chevrolet','Audi','Nissan','Hyundai','Subaru','Kia'];
const randomCarModels = ['Civic', 'Mustang', 'Corvette', 'Camry', 'Carrera', 'Wrangler', 'Golf', 'Charger', 'Prius', 'Outback'];

async function generateCarsHandler(state: State): Promise<void>{
  store.dispatch((previousState) => {
    return {...previousState, carsCount: previousState.carsCount + 100};
  });
  for(let index=0; index<100; index++){
    const randomColor = `#${Math.floor(Math.random() * 16_777_215).toString(16).padStart(6,'0')}`;
    const carName = randomCarNames[Math.floor(Math.random() * randomCarNames.length)];
    const carModel = randomCarModels[Math.floor(Math.random() * randomCarModels.length)];
    const randomName = carName + " " + carModel;
    const data = {
      name: randomName,
      color: randomColor,
    }
    const newCar = await createCar(data);
    if(newCar){
      await updateGarage(state.garagePage);
    }
  }
}
async function panelClickHandler(event: Event): Promise<void>{
  const button = event.target;
  if(!(button instanceof HTMLButtonElement)) return;
  const state: State = store.getState();
  switch(button.dataset.action){
    case "create": {
      createCarHandler(state);
      break;
    } 
    case "update": {
      updateCarHandler(state)
      break;
    }
    case "race": {
      break;
    }
    case "reset": {
      break;
    }
    case "generate-cars": {
      generateCarsHandler(state);
      break;
    }
    default: {
      break;
    }
  }
}
async function handleRemove(id: number, state: State){
  store.dispatch((previousState: State) => {
    return {
    ...previousState, 
    carsCount: previousState.carsCount - 1,
    };
      });
    await removeCar(id);
    await updateGarage(state.garagePage);

    const isWinner = state.winners.some((winner) => winner.id === id);
    if(isWinner){
      await removeWinner(id);
      removeWinnerField(id);
      store.dispatch((previousState: State) => {
      return {
        ...previousState, 
        winners: previousState.winners.filter((winner) => winner.id !== id),
      };
    });
  }
}
async function raceClickHandler(event: Event): Promise<void>{
  const button = event.target;
  if(!(button instanceof HTMLButtonElement)) return;
  const state = store.getState();
  const id = Number(button.id);
  switch(button.dataset.action){
    case "select": {
      store.dispatch((previousState) => {
        console.log(id);
        return {...previousState, selectedId: id};
      });
      break;
    }
    case "remove": {
      await handleRemove(id, state);
      break;
    }
    case "drive": {
      break;
    }
    case "stop": {
      break;
    }
  }
}
async function paginationHandler(event: Event): Promise<void>{
  const target = event.target;
  if(!(target instanceof HTMLButtonElement)) return;
  const state = store.getState();
  const currentPage = state.garagePage;
  if(target.id === "garage-prev-button"){
    store.dispatch((previousState) => {
      return {
      ...previousState,
      garagePage: currentPage - 1,
      }
    });
    await updateGarage(currentPage - 1);
  } else{
    store.dispatch((previousState) => {
      return {
      ...previousState,
      garagePage: currentPage + 1,
      }
    });
    await updateGarage(currentPage + 1);
  }
}
export function initGarageControls(): void {
  const panel = document.querySelector('#panel');
  if(!panel) return;
  panel.addEventListener('input', debounce(inputHandler, 50));
  panel.addEventListener('click', panelClickHandler);

  const carsContainer = document.querySelector('.cars-container');
  if(!carsContainer) return;
  carsContainer.addEventListener('click', raceClickHandler);

  const paginationButtons = document.querySelector('.pagination-block');
  if(!paginationButtons) return;
  paginationButtons.addEventListener('click', paginationHandler)
}

export function switchToGarage(){
  updateGarageState(store.getState());
  store.dispatch((previousState) => {
    return {...previousState, selectedId: null};
  });
}

