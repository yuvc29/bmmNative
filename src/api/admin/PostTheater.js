import axios from "axios";

const PostTheater = (details)=>{
    console.log(details);
    let response = axios.post('http://10.0.2.2:8080/theater', details);
}

export {PostTheater};