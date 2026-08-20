//getWinners, createWinner, updateWinner

import { apiAddress } from "../constants";
import { Car, Data, order, sort, Winner, WinnerDataParameters } from "../state/types";

export async function getWinners(page:number = 1, limit:number = 7, sort: sort = 'id', order: order = 'ASC'): Promise<Data<Winner>>{
  try{
    const url = `${apiAddress}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
    const response = await fetch(url, {
      method: 'GET'
    });
    if(!response.ok){
      throw new Error(`HTTP Error in getting winners! Response status: ${response.status}`);
    }
    const data: Winner[] = await response.json();
    const totalWinners = response.headers.get("X-Total-Count") ?? '0';
    return {
      items: data,
      count: totalWinners,
    }
  } catch(error){
    console.log("Error in getting winners api:", error);
    return {
      items: [],
      count: '0',
    }
  }
}
export async function getCar(id: number): Promise<Car>{
  try{
    const url = `${apiAddress}/garage/${id}`;
    const response = await fetch(url, {
      method: 'GET'
    });
    if(!response.ok){
      throw new Error(`HTTP Error in getting a single car! status: ${response.status}`);
    }
    const car: Car = await response.json();
    return car;
  } catch(error){
    console.log("Error in getting a single car api:", error);
    return {
      "name": "",
      "color": "",
      "id": 0
    }
  }
}

export async function removeWinner(id: number): Promise<number>{
  try{
    const url = `${apiAddress}/winners/${id}`;
    const response = await fetch(url, {
      method: 'DELETE'
    })
    return response.ok ? 1 : 0;
  } catch (error){
    console.log("Error in deleting single winner api:", error);
    return 0;
  }
}

export async function createWinner(data: WinnerDataParameters): Promise<Winner>{
  try{
    const url = `${apiAddress}/winners`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if(!response.ok){
      throw new Error(`HTTP Error in creating a winner! status: ${response.status}`);
    }
    const winner: Winner = await response.json();
    return winner;
  } catch(error){
    console.log("Error in creating winner api:", error);
    return {
      id: 0,
      wins: 0,
      time: 0
    }
  }
}