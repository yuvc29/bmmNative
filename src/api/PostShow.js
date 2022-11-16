import axios from "axios";

const PostShow = (details)=>{
    console.log(details)
    let response = axios.post('http://192.168.1.5:8080/show', details)
}

export {PostShow};