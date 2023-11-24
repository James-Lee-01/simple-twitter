import style from "./MainPage.module.scss";
import Navbar from "../../components/Main/Navbar/Navbar";
import TweetInput from "../../components/Main/TweetInput/TweetInput";
import TweetItem from "../../components/Main/TweetItem/TweetItem";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import { useEffect, useState } from "react";
import { getAllTweet } from "../../api/tweet.js";
import { useNavigate, useLocation } from "react-router-dom";
import { useDataChange } from "../../contexts/DataChangeContext";


export default function MainPage() {
  //For navigation and token authentication
  const navigate = useNavigate()
  const { pathname } = useLocation()
  // for tweet mapping
  const [tweets, setTweets] = useState([]);
  const { isDataChange } = useDataChange()

  useEffect(() => {
    const getAllTweets = async () => {
      try {
        const data = await getAllTweet();
        //若狀態顯示失敗，回傳訊息
        if (!data) {
          return;
        }
        //若狀態顯示成功則直接擷取資料
        if (data) {
          setTweets(data); //回傳資料格式
        }
      } catch (error) {
        console.log("推文擷取失敗", error);
      }
    };
    getAllTweets();
  }, [isDataChange]);




  //prohibited and redirection
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    if (userRole === "admin") {
      navigate("/admin/tweet");
    } else if (userRole === null) {
      navigate("/login");
    }
  }, [pathname, navigate]);

  //tweets mapping
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


  return (
    <MainLayout>
      <Navbar title='首頁' />
      <TweetInput />
      {/* list tweet */}
      <div className={style.tweetList}>
        { tweetsList }
      </div>
    </MainLayout>
  );
}
