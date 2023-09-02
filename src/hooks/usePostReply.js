import { useState } from 'react';
import { postReply } from '../api/tweet.js'
import { Toast } from '../api/tweet.js';

export default function usePostReply() {
  const [isUpdating, setIsUpdating] = useState(false) //確保同一時間內不會有多個回覆發送操作正在進行

  const replyPostHook = async (textInput, tweetId) => {
    try {
      if (isUpdating) return //不允許同時進行多個回覆發送操作
      setIsUpdating(true); //正在進行回覆發送操作
      //執行回覆發送postReply
      await postReply(textInput, tweetId);

      setIsUpdating(false); //回覆發送操作結束

    } catch (error) {
      console.error(error)
      Toast.fire({
        title: '回覆發送失敗',
        icon: 'error',
      });
      setIsUpdating(false); //回覆發送操作結束

    }
  }
  return {
    isUpdating,
    replyPostHook,
  };
}