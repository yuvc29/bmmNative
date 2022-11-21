import axios from 'axios';

const getOrdersByUserId = async(userId) => {
	try {
        console.log("UserID" , userId);
		const response =  await axios.get(`${server_url}/order/user?userId=${userId}`);
		// console.log("******GET***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

export {getOrdersByUserId};
