import axios from "axios";

const PostTheater = (details)=>{
    console.log(details);
    let response = axios.post('http://192.168.111.123:8080/theater', details);
}

export {PostTheater};