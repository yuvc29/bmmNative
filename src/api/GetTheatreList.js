import axios from 'axios';

const GetTheatreList = async(cityId, movieId, date) => {
	try {
		let response =  await axios.get(`${server_url}/theater/cityMovieDate?cityId=${cityId}&movieId=${movieId}&date=${date}`);
		// console.log("******Theaters***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

const GetShowsByTheatre = async(theatreId, movieId, date) => {
	try {
		let response =  await axios.get(`${server_url}/show/theaterMovieDate?theaterId=${theatreId}&movieId=${movieId}&date=${date}`);
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

const GetTheatreByCity = async(cityId) => {
	try {
		let response =  await axios.get(
			`${server_url}/theater/city/${cityId}`,
		  );
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}



export {GetTheatreList, GetShowsByTheatre, GetTheatreByCity};

