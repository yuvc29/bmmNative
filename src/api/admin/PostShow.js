import axios from "axios";

const PostShow = (details)=>{
    console.log(details)
    let response = axios.post('http://10.0.2.2:8080/show', details)
}

export {PostShow};