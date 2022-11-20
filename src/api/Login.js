const postUserLogin = async (userData) => {
    // const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
      try {
          let response = await fetch(
          `http://192.168.111.123:8080/login?username=${userData.username}&password=${userData.password}` ,
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
      let response =  await axios.get(`http://192.168.111.123:8080/user/email/${email}`);
      // console.log("******Shows***", response);
      return response;
    }
  
    catch (error) {
      console.log(error);
    }
  } 

  export {postUserLogin, getUserDetailsByEmail};