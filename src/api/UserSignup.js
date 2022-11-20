import axios from "axios";

const UserSignup = (details)=>{
    try {
        let response = axios.post('http://192.168.111.123:8080/user', details)
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export {UserSignup};