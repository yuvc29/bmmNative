import axios from "axios";

const PostShow = (details)=>{
    console.log(details)
    let response = axios.post(`${server_url}/show`, details)
}

export {PostShow};