import { useState } from 'react';
import { postReply } from '../api/reply.js'
import { Toast } from '../api/reply.js';

export default function usePostReply() {
  const [isUpdating, setIsUpdating] = useState(false) //確保同一時間內不會有多個回覆發送操作正在進行

  const replyPostHook = async (textInput, tweetId) => {
    try {
      if (isUpdating) return //不允許同時進行多個回覆發送操作
      setIsUpdating(true); //正在進行回覆發送操作
      //執行回覆發送postReply
      const res = await postReply(textInput, tweetId);

      if (res.id) {
        Toast.fire({
          title: '回覆發送成功',
          icon: 'success',
        });
      } else {
        Toast.fire({
          title: '回覆發送失敗',
          icon: 'error',
        });
      }
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