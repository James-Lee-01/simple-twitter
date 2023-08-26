import axios from "axios";

export const baseUrl = "http://localhost:3001"

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
    console.log(data)
    return data
  } catch (error) {
    console.error('[getAllTweet Failed]', error)
    return error
  }
}