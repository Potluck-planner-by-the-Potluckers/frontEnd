import axios from "axios";

// create a new 'instance' of axios that will have
// all our configs on it, and we will be ale to use
//it in place of axios throughout our app

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token')
  return axios.create({
    // axios request config
    //https://github.com/axios/axios#request-config
    headers: {
      Authorization: `Bearer ${token}`,
    },
    baseURL: 'https://viriditymoon-buildweek.herokuapp.com',
  });
};

export default axiosWithAuth