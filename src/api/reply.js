import axios from "axios";
import Swal from 'sweetalert2';
import { apiHelper } from '../api/tweet.js';

export const baseUrl = ""
// const axiosInstance = axios.create({
//   baseURL: baseUrl,
// });

// get tweet replies
export const getTweetReplies = async (tweetId) => {
  try {
    const { data } = await apiHelper.get(`/tweets/${tweetId}/replies`);

    return data;
  } catch (error) {
    console.error("[Get tweet replies Failed]:", error);
    return error
  }
};

// 發布回覆
export const postReply = async (comment, tweetId) => {
  try {
    const { data } = await apiHelper.post(`/tweets/${tweetId}/replies`, {
      comment,
    });

    return data;
  } catch (error) {
    console.error('[getPostReply Failed]');
    return error;
  }
};

// 彈出通知視窗
export const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});