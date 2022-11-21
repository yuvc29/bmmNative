import axios from "axios";

const PostCast = async(movieId, actorId)=>{
    console.log("Post Cast",movieId, actorId);
    let response = await axios.post(`${server_url}/cast?movieId=${movieId}&actorId=${actorId}`);
    return response;
}

export {PostCast};