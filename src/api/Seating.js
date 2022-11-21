import axios from 'axios';

const GetSeatsbyShowId = async(showId) => {
	try {
		let response =  await axios.get(`${server_url}/seat/show/${showId}`);
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

const ReserveBookedSeats = async(showId) => {
	// try {
	// 	let response =  await axios.get(`${server_url}/seat/show/${showId}`);
	// 	// console.log("******Shows***", response);
	// 	return response;
	// }

	// catch (error) {
	// 	console.log(error);
	// }
}

const PostMyOrder = async(orderObj) => {
	console.log("Order Obj", orderObj);
	try {
		let response =  await axios.post(`${server_url}/order`, orderObj);
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

const PostBookedSeats = async(seatObj) => {
	try {
		let response =  await axios.post(`${server_url}/seat`, seatObj);
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

export {GetSeatsbyShowId, ReserveBookedSeats, PostMyOrder, PostBookedSeats};
