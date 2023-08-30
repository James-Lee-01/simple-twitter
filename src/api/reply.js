import { apiHelper } from '../api/tweet';
import Swal from 'sweetalert2';

// 獲取推文回覆
export const getTweetReplies = async (TweetId) => {
  try {
    const { data } = await apiHelper.get(`/tweets/${TweetId}/replies`);

    return data;
  } catch (error) {
    console.error("[Get tweet replies Failed]:", error);
    return error
  }
};

// 發布回覆
export const postReply = async (comment, TweetId) => {
  try {
    const { data } = await apiHelper.post(`/tweets/${TweetId}/replies`, {
      comment,
    });

    return data;
  } catch (error) {
    console.error(error);
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