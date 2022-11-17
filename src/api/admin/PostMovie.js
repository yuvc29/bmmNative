import axios from "axios";

const PostMovie = async(details)=>{
    console.log(details);
    let response = await axios.post('http://10.0.2.2:8080/movie', details);
}

export {PostMovie};