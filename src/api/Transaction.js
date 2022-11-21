import axios from "axios";
const PostTransaction = async(transactionObj) => {
	try {
		let response =  await axios.post(`${server_url}/transaction`, transactionObj);
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

export {PostTransaction};