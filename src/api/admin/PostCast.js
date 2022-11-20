import axios from "axios";

const PostCast = async(movieId, actorId)=>{
    console.log("Post Cast",movieId, actorId);
    let response = await axios.post(`http://192.168.111.123:8080/cast?movieId=${movieId}&actorId=${actorId}`);
    return response;
}

export {PostCast};