import React from 'react'
import axios from 'axios';

const GetCastByMovieId = async(movieId) => {
	try {
		let response =  await axios.get(`http://192.168.111.123:8080/actors/${movieId}`);
		// console.log("******GET***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

export {GetCastByMovieId};
