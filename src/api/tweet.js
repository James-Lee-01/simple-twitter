import axios from "axios";

export const baseUrl = "https://young-waters-15158-8b230f0b0919.herokuapp.com/api"

//////////////////////////////////
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);
//////////////////////////////////


//get all tweets
export const getAllTweet = async () => {
  try {
    const { data } = await axiosInstance.get('/tweets')
    // console.log(data)
    return data
  } catch (error) {
    console.error('[getAllTweet Failed]', error)
    return error
  }
}