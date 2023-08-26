import styles from "./MainPage.module.scss";
import { useEffect, useState } from "react";
import { getAllTweet } from "../../api/tweet.js";

export default function MainPage() {
  const [tweet, setTweet] = useState([]);

  useEffect(() => {
    const getAllTweets = async () => {
      try {
        const data = await getAllTweet();
        //若狀態顯示失敗，回傳訊息
        if (data.status === "error") {
          console.log(data.message);
          return;
        }
        //若狀態顯示成功則直接擷取資料
        if (data) {
          setTweet(data);
        }
      } catch (error) {
        console.log("推文擷取失敗", error);
      }
    };
    getAllTweets();
  });

  const tweetListAll = tweet.map((tweet) => {
    return (
      <div>
        <div>1:{tweet.id}</div>
        <div>2:{tweet.userId}</div>
        <div>3:{tweet.User.name}</div>
        <div>4:{tweet}</div>
        <div>5:{tweet}</div>
        <div>6:{tweet}</div>
      </div>
    );
  })

  return <div>{tweet && tweetListAll}</div>;
}
