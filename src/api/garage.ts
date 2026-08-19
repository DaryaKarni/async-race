// getCars, createCar, updateCar, deleteCar

import { apiAddress, totalCarsGarage } from "../constants"
import { Car, Data, DataParameters } from "../state/types";

export async function getCars(page: number = 1, limit: string = totalCarsGarage): Promise<Data>{
  try{
    const url = `${apiAddress}/garage?_page=${page}&_limit=${limit}`;
    const response = await fetch(url, { method: "GET"});
    if(!response.ok){
      throw new Error(`HTTP error in get! status: ${response.status}`);
    }
    const cars = await response.json();
    const totalCount = response.headers.get("X-Total-Count") ?? '0';
    return {
      items: cars,
      count: totalCount,
    }
  }catch(error){
    console.log("Error in getting cars api:", error);
    return {
      items: [],
      count: "0",
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