import { createCar, getCars, removeCar } from "../../api/garage"
import { store } from "../../state/app-state";
import { Car, State } from "../../state/types";
import { removeCarTrack, renderCarTrack } from "./car-card";

export async function updateGarage(): Promise<void> {
  const object = await getCars();
  const cars = object.items;
  const count: number = Number(object.count);
  for(const car of cars){
    renderCarTrack(car);
  }
  store.dispatch((previousState: State) => {
    return {
    ...previousState,
    carsCount: count,
    }
  });
  const countText = document.querySelector('#cars-number');
  if(countText){
    countText.textContent = String(count);
  }
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
async function panelClickHandler(event: Event): Promise<void>{
  const button = event.target;
  if(!(button instanceof HTMLButtonElement)) return;
  const state: State = store.getState();
  switch(button.dataset.action){
    case "create": {
      if(inputCreate instanceof HTMLInputElement){
        inputCreate.value = '';
        inputCreate.dispatchEvent(new Event('input', {bubbles: true}));
      }
      const car: Car | undefined = await createCar({
        name: state.createInput,
        color: state.createColor,
      });
      if(car){
        renderCarTrack(car);
      }
    } 
    case "update": {
      //
    }
    case "race": {
      //
    }
    case "reset": {
      //
    }
    case "generate-cars": {
      //
    }
    default: {
      //
    }
  }
}
async function raceClickHandler(event: Event): Promise<void>{
  const button = event.target;
  if(!(button instanceof HTMLButtonElement)) return;
  switch(button.dataset.action){
    case "select": {
      //
    }
    case "remove": {
      await removeCar(Number(button.id));
      removeCarTrack(button.id);
    }
    case "drive": {
      //
    }
    case "stop": {
      //
    }
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
}

export function switchToGarage(){
  updateGarageState(store.getState());
}

