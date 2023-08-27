import styles from "./MainPage.module.scss";
import { useEffect, useState } from "react";
import { getAllTweet } from "../../api/tweet.js";

export default function MainPage() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const getAllTweets = async () => {
      try {
        const res = await getAllTweet();
        //若狀態顯示失敗，回傳訊息
        if (res.status === "error") {
          console.log(res.message);
          return;
        }
        //若狀態顯示成功則直接擷取資料
        if (res) {
          setTweets(res.data.tweets); //拆解回傳資料格式
        }
      } catch (error) {
        console.log("推文擷取失敗", error);
      }
    };
    getAllTweets();
  }, []);


  const tweetListAll = tweets.map((tweet) => {
    return (
      <div key={tweet.id}>
        <div>1:{tweet.id}</div>
        <div>2:{tweet.userId}</div>
        <div>3:{tweet.User.name}</div>
      </div>
    );
  });

  return (<div>{tweetListAll}</div>)
}
