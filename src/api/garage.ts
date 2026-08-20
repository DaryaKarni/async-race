// getCars, createCar, updateCar, deleteCar

import { apiAddress, totalCarsGarage } from "../constants"
import { Car, Data, DataParameters } from "../state/types";

export async function getCars(page: number = 1, limit: number = totalCarsGarage): Promise<Data<Car>>{
  try{
    const url = `${apiAddress}/garage?_page=${page}&_limit=${limit}`;
    const response = await fetch(url, { method: "GET"});
    if(!response.ok){
      throw new Error(`HTTP error in get! status: ${response.status}`);
    }
    const cars: Car[] = await response.json();
    const totalCount = response.headers.get("X-Total-Count") ?? '0';
    return {
      items: cars,
      count: Number(totalCount),
    }
  }catch(error){
    console.log("Error in getting cars api:", error);
    return {
      items: [],
      count: 0,
    }
  }
}

export async function createCar(data: DataParameters): Promise<Car | undefined>{
  try{
    const url = `${apiAddress}/garage?`;
    const response = await fetch (url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if(!response.ok){
      throw new Error(`HTTP error in create! status: ${response.status}`);
    }
    const newCar: Car = await response.json();
    return newCar;
  } catch(error){
    console.log("Error in creating cars api:", error);
    return;
  }
}

export async function removeCar(id: number): Promise<void>{
  try{
    const url = `${apiAddress}/garage/${id}`;
    const response = await fetch (url, {
      method: 'DELETE',
    });
    if(!response.ok){
      throw new Error(`HTTP error in delete! status: ${response.status}`);
    }
  } catch(error){
    console.log("Error in removing cars api:", error);
  }
}

export async function updateCar(id: number, data: DataParameters): Promise<Car | undefined>{
  try{
    const url = `${apiAddress}/garage/${id}`;
    const response = await fetch (url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if(!response.ok){
      throw new Error(`HTTP error in update! status: ${response.status}`);
    }
    const newCar: Car = await response.json();
    return newCar;
  } catch(error){
    console.log("Error in updating cars api:", error);
  }
}