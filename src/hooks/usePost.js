import { postTweet } from "../api/tweet";
import { useState } from "react";

//推文發布
export default function usePost () {
  	//狀態
	const [isUpdating, setIsUpdating] = useState(false)

  const postTweetContent = async (textInput) => {
      try {
        if (isUpdating) return;
        if (!isUpdating) {
					setIsUpdating(true);
          //API
          const data = await postTweet(textInput);
          if (data.description) {
            setIsUpdating(false); //改變更新狀態
            console.log("[posted]", data);
          }
        }
      } catch (error) {
        console.error("[postTweetContent Failed]", error);
      }
    };
    return{
    isUpdating,
    postTweetContent
    }
}


