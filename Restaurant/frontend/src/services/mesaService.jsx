import axios from "axios";
import { baseUrl } from "./baseService";

const getMesas = async () => {
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
    const response = await axios.get(`${baseUrl}/mesas`)
    return response.data
  };

const getMesaById = async (id) => {
    const response = await axios.get(`${baseUrl}/mesas/${id}`);
    return response.data
}

const deleteMesa = async (id) => {
    const response = await axios.delete(`${baseUrl}/mesas/${id}`);
    return response.data
}

const updateMesa = async (data) => {
    const response = await axios.put(`${baseUrl}/mesas/${data.idMesa}`, data)
    return response.data
}
  
const createMesa = async (data) => {
    const response = await axios.post(`${baseUrl}/mesas`, data);
    return response.data
}

export default {getMesas, getMesaById, updateMesa, deleteMesa, createMesa};