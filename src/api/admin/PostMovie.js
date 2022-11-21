import axios from "axios";

const PostMovie = async(details)=>{
    console.log("Post Movie New",details);
    let response = await axios.post(`${server_url}/movie`, details);
}

export {PostMovie};