// getCars, createCar, updateCar, deleteCar

import { apiAddress, totalCarsGarage } from "../constants"

export async function getCars(page = 1, limit = totalCarsGarage){
  try{
    const url = `${apiAddress}/garage?_page=${page}&_limit=${limit}`;
    const response = await fetch(url, { method: "GET"});
    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const cars = await response.json();
    const totalCount = response.headers.get("X-Total-Count");
    return {
      items: cars,
      count: totalCount,
    }
  }catch(error){
    console.log("Error in getting cars api:", error);
    return {
      items: [],
      totalCount: 0,
    }
  }
}