import axios from "axios";
import { getUserInfo, updateUserInfo, changePassword } from "../constant/ShopApi";

// get user's info
export function getUserInfoApi(){
    return axios.get(getUserInfo, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
            //'Authorization': `Bearer ${token}`, 
        }
    });
}

// update user's info
export function updateUserInfoApi(user){
    return axios.post(updateUserInfo, user, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

//change password
export function changePasswordApi(changPassForm){
    return axios.post(changePassword, changPassForm, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}