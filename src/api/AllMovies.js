import axios from "axios";
const getAllMovies = async() => {
	try {
		let response =  await axios.get(`${server_url}/movie`);
		// console.log("******GET***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

  
  export {getAllMovies};