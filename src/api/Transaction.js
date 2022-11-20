import axios from "axios";
const PostTransaction = async(transactionObj) => {
	try {
		let response =  await axios.post(`http://192.168.111.123:8080/transaction`, transactionObj);
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

export {PostTransaction};