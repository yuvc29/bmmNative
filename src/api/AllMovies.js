import axios from "axios";
const getAllMovies = async() => {
	try {
		let response =  await axios.get("http://10.0.2.2:8080/movie");
		// console.log("******GET***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

  
  export {getAllMovies};