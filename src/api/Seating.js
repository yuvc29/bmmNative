import axios from 'axios';

const GetSeatsbyShowId = async(showId) => {
	try {
		let response =  await axios.get(`http://192.168.111.123:8080/seat/show/${showId}`);
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

const ReserveBookedSeats = async(showId) => {
	// try {
	// 	let response =  await axios.get(`http://192.168.111.123:8080/seat/show/${showId}`);
	// 	// console.log("******Shows***", response);
	// 	return response;
	// }

	// catch (error) {
	// 	console.log(error);
	// }
}

const PostMyOrder = async(orderObj) => {
	try {
		let response =  await axios.post(`http://192.168.111.123:8080/order`, orderObj);
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

const PostBookedSeats = async(seatObj) => {
	try {
		let response =  await axios.post(`http://192.168.111.123:8080/seat`, seatObj);
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

export {GetSeatsbyShowId, ReserveBookedSeats, PostMyOrder, PostBookedSeats};
