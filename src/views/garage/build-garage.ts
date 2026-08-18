import { getCars } from "../../api/garage"
import { renderCarTrack } from "./car-card";

export async function updateGarage(): Promise<void> {
  const page = 1;
  const object = await getCars(page);
  const cars = object.items;
  const count = object.count;
  for(const car of cars){
    renderCarTrack(car);
  }
  const countText = document.querySelector('#cars-number');
  if(countText){
    countText.textContent = String(count);
  }
  const pageCountText = document.querySelector('#garage-page-number');
  if(pageCountText){
    pageCountText.textContent = String(page);
  }
}
