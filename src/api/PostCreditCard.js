import axios from "axios";
const PostCreditCard = async(cardObj) => {
	try {
		let response =  await axios.post(`${server_url}/card`, cardObj);
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

export {PostCreditCard};