import axios from 'axios';

const GetCardByUserId = async(userId) => {
	try {
		let response =  await axios.get(`http://10.0.2.2:8080/card/user/${userId}`);
		// console.log("******GET***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

export {GetCardByUserId};
