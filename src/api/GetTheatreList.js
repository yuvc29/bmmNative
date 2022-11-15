import axios from 'axios';

const GetTheatreList = async(cityId, movieId, date) => {
	try {
		let response =  await axios.get(`http://10.0.2.2:8080/theater/cityMovieDate?cityId=${cityId}&movieId=${movieId}&date=${date}`);
		// console.log("******Theaters***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

const GetShowsByTheatre = async(theatreId, movieId, date) => {
	try {
		let response =  await axios.get(`http://10.0.2.2:8080/show/theaterMovieDate?theaterId=${theatreId}&movieId=${movieId}&date=${date}`);
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}



export {GetTheatreList, GetShowsByTheatre};
