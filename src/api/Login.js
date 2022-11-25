const postUserLogin = async (userData) => {
  console.log("login", userData);
    // const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
      try {
          let response = await fetch(
          `${server_url}/login?username=${userData.username}&password=${userData.password}` ,
          // {headers: { 'X-XSRF-TOKEN': csrfToken },},
          {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              // body: JSON.stringify({
              //   username: userData.username,
              //   password: userData.password,
              // })
            });
            return response;
      } catch (error) {
        console.error(error);
      }
    };


  import axios from "axios";

  const getUserDetailsByEmail =async(email) => {
    try {
      let response =  await axios.get(`${server_url}/user/email?email=${email}`);
      // console.log("******Shows***", response);
      return response;
    }
  
    catch (error) {
      console.log(error);
    }
  } 

  export {postUserLogin, getUserDetailsByEmail};