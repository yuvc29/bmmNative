import axios from "axios";
const PostCreditCard = async(cardObj) => {
	try {
		let response =  await axios.post(`http://10.0.2.2:8080/card`, cardObj);
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

export {PostCreditCard};