import axios from 'axios';

const GetCityList = async() => {
	try {
        const response = await axios.get(`${server_url}/city`);
        return response;
      } catch (error) {
        console.log(error);
      }
}

export {GetCityList};
