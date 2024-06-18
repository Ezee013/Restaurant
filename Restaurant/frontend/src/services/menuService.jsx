import axios from "axios";
import { baseUrl } from "./baseService";

const getMenus = async () => {
    // return fetch("http://localhost:3001/api/estaciones", 
    //   {
    //     headers: {"content-type": 'application/json', "Authorization": `Bearer ${token}`}
    //   }
    // ).then((response) =>
    //   response.json()
    // );
    // const response = await axios.get(`${baseUrl}/estaciones`, {
    //   headers: {"Authorization" : `Bearer ${token}`}
    // })  
    const response = await axios.get(`${baseUrl}/menus`)
    return response.data
  };

const getMenuById = async (id) => {
    const response = await axios.get(`${baseUrl}/menus/${id}`);
    return response.data
}

const deleteMenu = async (id) => {
    const response = await axios.delete(`${baseUrl}/menus/${id}`);
    return response.data
}

const updateMenu = async (data) => {
    const response = await axios.put(`${baseUrl}/menus/${data.idMenu}`, data);
    return response.data
}
  
const createMenu = async (data) => {
    const response = await axios.post(`${baseUrl}/menus`, data);
    return response.data
}

export default {getMenus, getMenuById, deleteMenu, updateMenu, createMenu}