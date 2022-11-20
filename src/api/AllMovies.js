import axios from "axios";
const getAllMovies = async() => {
	try {
		let response =  await axios.get("http://192.168.111.123:8080/movie");
		// console.log("******GET***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

  
  export {getAllMovies};