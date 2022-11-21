import axios from "axios";

const UserSignup = (details)=>{
    try {
        let response = axios.post(`${server_url}/user`, details)
        // console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export {UserSignup};