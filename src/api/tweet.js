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

//follow
export const followUser = async (userId) => {
    try {
        const { data } = await axiosInstance.post(`/followships`, {
          id: userId,
        });
        return data
    } catch (error) {
        console.error('[followUser Failed]', error);
        // console.log(userId)
        return error;
    }
};


//unfollow
export const unFollowUser = async (followingId) => {
    try {
        const { data } = await axiosInstance.delete(`/followships/${followingId}`);
        return data
    } catch (error) {
        console.error('[unFollowUser Failed]', error);
        // console.log(followingId)
        return error;
    }
};

//////Admin Get All Tweets

export const getAdminTweets = async () => {
  try{
    const {data} = await axiosInstance.get(`/admin/tweets`)
    return data
  } catch (error) {
    console.error('[Admin get all tweets Failed]:', error)
    return error
  }
} 

//Post Tweet Like
export const postLike = async (tweetId) => {
    try {
        await axiosInstance.post(`/tweets/${tweetId}/like`, {});
    } catch (error) {
        console.error('[postLike Failed]:', error);
        // console.log('4',tweetId)
        return error
    }
};

//Post Tweet Unlike
export const postUnlike = async (tweetId) => {
    try {
        await axiosInstance.post(`/tweets/${tweetId}/unlike`, {});
    } catch (error) {
        console.error('[postUnlike Failed]:', error);
        return error
    }
};

//Admin Get All Tweets
export const adminGetAllTweets = async () => {
  try{
    const {data} = await axiosInstance.get(`/admin/tweets`)
    console.log('adminTweetPage', data)
    return data
  } catch (error) {
    console.error('[Admin get all tweets Failed]:', error)
    return error
  }
} 

//Get User Tweet
export const getUserTweet = async (userId) => {
    try {
        const { data } = await axiosInstance.get(`/users/${userId}/tweets`);
        return data;
    } catch (error) {
        console.log('[getUserTweets Failed]:', error);
        return error;
    }
};

//Get User Like Tweets
export const getUserLike = async (userId) => {
    try {
        const { data } = await axiosInstance.get(`/users/${userId}/likes`);
        
        return data;
    } catch (error) {
        console.log('[getUserLike Failed]:', error);
        return error;
    }
};

//Get User Reply Tweets
export const getUserReply = async (userId) => {
    try {
        const { data } = await axiosInstance.get(`/users/${userId}/replied_tweets`);
        console.log('getUserReply',data)
        return data;
    } catch (error) {
        console.log('[Get user replies Failed]:', error);
        return error;
    }
};

//Update user profile(photo)
export const setUserProfile = async (formData, userId) => {
  try {
    const {data} = await axiosInstance.put(`/users/${userId}`,
      formData ,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data
  } catch (error) {
    console.log("[setUserProfile Failed]:", error);
    return error
  }

};

//
export const apiHelper = axiosInstance;
