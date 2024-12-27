import axios from "axios";
import { LoginUrl, LogoutUrl } from "../constant/ShopApi";

export async function logout(){
    return axios.post(LogoutUrl,{
        withCredentials: true,
        headers:{
            "Content-Type": 'application/json'
        }
    })
}

export async function login(loginData){
    return axios.post(LoginUrl, loginData, {
        withCredentials: true,
        headers:{
            "Content-Type": 'application/json',
        }
    })
}
