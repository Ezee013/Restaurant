import axiosInstance from "./axiosInstance"
import { baseUrl } from "./baseService";

const doLogin = async (login) => {
    console.log(login);

    // fetch(`${baseUrl}/login`, {
    //       method: "POST",
    //       body: JSON.stringify(login),
    //       headers: {"content-type": 'application/json'}
    //     })
    const response = await axiosInstance.post(`${baseUrl}/login`, login)
    console.log(response.data)
    return response.data

};

export default { doLogin };
