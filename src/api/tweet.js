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
//////////  時間轉換  /////////////
export const getRelativeTime = (createdAt) => {
  if (!createdAt) return
  const now = new Date();
  const createdDate = new Date(createdAt);
  const timeDiff = now - createdDate;
  const seconds = Math.floor(timeDiff / 1000);

  if (seconds < 60) {
    return `${seconds}秒前`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}分鐘前`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours}小時前`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days}天前`;
  }
}


export const getDetailedTime = (createdAt) => {
  if (!createdAt) return
  const parsedDate = new Date(createdAt);
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();
  const hours = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();
  const period = hours < 12 ? "上午" : "下午";

  const formattedDate = `${period} ${hours}:${minutes} · ${year}年${month}月${day}日 `;
  return formattedDate;
}


/////////////////////////////////


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

//get single tweet info
export const getTweet = async (tweetId) => {
    try {
        const { data } = await axiosInstance.get(`/tweets/${tweetId}`);
        // console.log(data)
        return data;
    } catch (error) {
        console.error('[getTweet Failed]:', error);
        return error;
    }
};

//get single tweet replies
export const getTweetReplies = async (tweetId) => {
    try {
        const {data} = await axiosInstance.get(`/tweets/${tweetId}/replies`);
        console.log(data)
        return data;
    } catch (error) {
        console.error("[getTweetReplies Failed]:", error);
    return error
    }
};