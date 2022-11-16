const postUserLogin = async (userData) => {
    // const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
      try {
          let response = await fetch(
          `http://10.0.2.2:8080/login?username=${userData.username}&password=${userData.password}` ,
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
  // import axios from "axios";

  // function postUserLogin(userData) {
  //   console.log("post");
  //   var bodyFormData = new FormData();
  //   bodyFormData.append('username', userData.username);
  //   bodyFormData.append('password', userData.password);
  //   var myHeader = new Headers();
  //   myHeader.append('content-type', 'multipart/form-data');
  //   try {
  //     let response = axios({
  //       method: "post",
  //       url: "/login",
  //       data: bodyFormData,
  //       headers: myHeader,
  //     })
  //     return response;
  //   } catch (error){
  //     console.error(error);
  //   }
  // } 

  export {postUserLogin};