import axios from "axios";
const PostCreditCard = async(cardObj) => {
	try {
		let response =  await axios.post(`http://192.168.111.123:8080/card`, cardObj);
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

export {PostCreditCard};