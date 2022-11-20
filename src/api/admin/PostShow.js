import axios from "axios";

const PostShow = (details)=>{
    console.log(details)
    let response = axios.post('http://192.168.111.123:8080/show', details)
}

export {PostShow};