import axios from "axios";

const PostTheater = (details)=>{
    console.log(details);
    let response = axios.post(`${server_url}/theater`, details);
}

export {PostTheater};