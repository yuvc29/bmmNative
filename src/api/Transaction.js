import axios from "axios";
const PostTransaction = async(transactionObj) => {
	try {
		let response =  await axios.post(`http://10.0.2.2:8080/transaction`, transactionObj);
		// console.log("******Shows***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

export {PostTransaction};