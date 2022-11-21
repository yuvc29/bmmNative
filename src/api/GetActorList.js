import axios from 'axios';

const GetActorList = async() => {
	try {
		let response =  await axios.get(`${server_url}/actor`);
		// console.log("******GET***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

export {GetActorList};
