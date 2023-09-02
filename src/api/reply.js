import Swal from 'sweetalert2';
import { apiFunction } from '../api/tweet.js';

export const baseUrl = "https://young-waters-15158-8b230f0b0919.herokuapp.com/api"

// 發布回覆
export const postReply = async (comment, tweetId) => {
  try {
    const { data } = await apiFunction.post(`/tweets/${tweetId}/replies`, {
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
  timer: 2000,
  timerProgressBar: true,
});