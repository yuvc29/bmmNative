import axios from "axios";

const PostMovie = (details)=>{
    console.log(details)
        let response = axios.post('http://192.168.111.56:8080/movie', details)
}

export {PostMovie};