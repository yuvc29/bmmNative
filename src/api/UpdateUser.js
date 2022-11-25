import axios from "axios";

const UpdateUser = async (userId,userData) => {
    console.log("UserId", userId, "UserDAta", userData);
    // const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
      try {
          const response = axios.put(`${server_url}/user/${userId}`, userData)
            return response;
      } catch (error) {
        console.error(error);
      }
    };

export {UpdateUser};