import axios from "axios";
// const axios = require('axios').default;
// const getAllMovies = async () => {
//     // const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
//       try {
//           let response = await fetch(
//           `http://10.0.2.2:8080/movie` ,
//           // {headers: { 'X-XSRF-TOKEN': csrfToken },},
//           {
//               method: 'GET',
//             //   headers: {
//             //     Accept: 'application/json',
//             //     'Content-Type': 'application/json'
//             //   },
//               // body: JSON.stringify({
//               //   username: userData.username,
//               //   password: userData.password,
//               // })
//             });
//             console.log("#$%#$%##$%#%",await response);
//             return response;
//       } catch (error) {
//         console.error(error);
//       }
//     };
const getAllMovies = async() => {
	try {
		let response =  await axios.get("http://10.0.2.2:8080/movie");
		// console.log("******GET***", response);
		return response;
	}

	catch (error) {
		console.log(error);
	}
}

  
  export {getAllMovies};