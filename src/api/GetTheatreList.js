import axios from 'axios';

const GetTheatreList = async(cityId, movieId, date) => {
	try {
		let response =  await axios.get(`http://192.168.111.123:8080/theater/cityMovieDate?cityId=${cityId}&movieId=${movieId}&date=${date}`);
		// console.log("******Theaters***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

const GetShowsByTheatre = async(theatreId, movieId, date) => {
	try {
		let response =  await axios.get(`http://192.168.111.123:8080/show/theaterMovieDate?theaterId=${theatreId}&movieId=${movieId}&date=${date}`);
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

export {GetTheatreList, GetShowsByTheatre};
