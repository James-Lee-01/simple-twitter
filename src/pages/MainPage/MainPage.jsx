import style from "./MainPage.module.scss";
import Navbar from "../../components/Main/Navbar/Navbar";
import TweetInput from "../../components/Main/TweetInput/TweetInput";
import TweetItem from "../../components/Main/TweetItem/TweetItem";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import { useEffect, useState } from "react";
import { getAllTweet } from "../../api/tweet.js";

import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";

// const tweetsList = [
//     {
//         "name": "test1",
//         "account": "test1",
//         "time": "3 小時",
//         "replyCount": "5",
//         "likeCount": "10"
//     },
//     {
//         "name": "test2",
//         "account": "test2",
//         "time": "10 小時",
//         "replyCount": "15",
//         "likeCount": "30"
//     },
//     {
//         "name": "test3",
//         "account": "test3",
//         "time": "6月23日",
//         "replyCount": "100",
//         "likeCount": "140"
//     },
//     {
//         "name": "test4",
//         "account": "test4",
//         "time": "6月21日",
//         "replyCount": "0",
//         "likeCount": "1"
//     },
//     {
//         "name": "test5",
//         "account": "test5",
//         "time": "6月18日",
//         "replyCount": "120",
//         "likeCount": "200"
//     },
//     {
//         "name": "test6",
//         "account": "test6",
//         "time": "6月27日",
//         "replyCount": "5",
//         "likeCount": "30"
//     },
//     {
//         "name": "test7",
//         "account": "test7",
//         "time": "6月24日",
//         "replyCount": "5",
//         "likeCount": "120"
//     },
//     {
//         "name": "test8",
//         "account": "test8",
//         "time": "6月10日",
//         "replyCount": "10",
//         "likeCount": "110"
//     },
//     {
//         "name": "test9",
//         "account": "test9",
//         "time": "6月11日",
//         "replyCount": "20",
//         "likeCount": "14"
//     },
//     {
//         "name": "test10",
//         "account": "test10",
//         "time": "6月13日",
//         "replyCount": "1",
//         "likeCount": "5"
//     },
// ]

export default function MainPage() {
  //For navigation and token authentication
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate()
  const { pathname } = useLocation()
  // for tweet mapping
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const getAllTweets = async () => {
      try {
        const data = await getAllTweet();
        //若狀態顯示失敗，回傳訊息
        if (!data) {
          // console.log("data failed");
          return;
        }
        //若狀態顯示成功則直接擷取資料
        if (data) {
          setTweets(data); //回傳資料格式
          // console.log('data get!');
        }
      } catch (error) {
        console.log("推文擷取失敗", error);
      }
    };
    getAllTweets();
  }, []);


  const tweetsList = tweets.map((props) => {
    return (
      <TweetItem
        key={props.id}
        tweetId={props.id}
        userId={props.userId}
        userName={props.User.name}
        account={props.User.account}
        avatar={props.User.avatar}
        description={props.description}
        likedCount={props.likedCount}
        replyCount={props.replyCount}
        isLiked={props.isLiked}
        createdAt={props.createdAt}
      />
    )
    });



  // const tweetListAll = tweets.map((tweet) => {
  //   return (
  //     <div key={tweet.id}>
  //       <div>1:{tweet.id}</div>
  //       <div>2:{tweet.userId}</div>
  //       <div>3:{tweet.User.name}</div>
  //     </div>
      
  //   );
  // });

  return (
    <MainLayout>
      <Navbar title='首頁' />
      <TweetInput />
      {/* list tweet */}
      <div className={style.tweetList}>
        {
          tweetsList
          
          // tweetsList.map((user) =>
          //     <TweetItem user={user} />
          // )
        }
      </div>
    </MainLayout>
  );
}
