import React from 'react'
import axios from 'axios';

const GetCastByMovieId = async(movieId) => {
	try {
		let response =  await axios.get(`${server_url}/actors/${movieId}`);
		// console.log("******GET***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

export {GetCastByMovieId};
