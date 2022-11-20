import axios from "axios";

const PostMovie = async(details)=>{
    console.log("Post Movie New",details);
    let response = await axios.post('http://192.168.111.123:8080/movie', details);
}

export {PostMovie};