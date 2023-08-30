import { useState } from 'react';
import { postReply } from '../api/reply.js'
import { Toast } from '../api/reply.js';

export default function usePostReply() {
  const [isUpdating, setIsUpdating] = useState(false)

  const postReplyHook = async (textInput, tweetId) => {
    try {
      if (isUpdating) return

      setIsUpdating(true)
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
      setIsUpdating(false)

    }
  }
  return {
    isUpdating,
    postReplyHook
  }
}