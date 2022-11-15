import axios from 'axios';

const GetSeatsbyShowId = async(showId) => {
	try {
		let response =  await axios.get(`http://10.0.2.2:8080/seat/show/${showId}`);
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}



export {GetSeatsbyShowId};
