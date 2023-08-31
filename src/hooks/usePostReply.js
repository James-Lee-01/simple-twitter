import { useState } from 'react';
import { postReply } from '../api/reply.js'
import { Toast } from '../api/reply.js';

export default function usePostReply() {
  const [isUpdating, setIsUpdating] = useState(false) //確保同一時間內不會有多個回覆發送操作正在進行

  const replyPostHook = async (textInput, tweetId) => {
    try {
      if (isUpdating) return //已有回覆發送操作正在進行，因為不允許同時進行多個回覆發送操作，所以這裡直接返回

      setIsUpdating(true);
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
      setIsUpdating(false)

    } catch (error) {
      console.error(error)
      Toast.fire({
        title: '回覆發送失敗',
        icon: 'error',
      });
      setIsUpdating(false);

    }
  }
  return {
    isUpdating,
    replyPostHook,
  };
}