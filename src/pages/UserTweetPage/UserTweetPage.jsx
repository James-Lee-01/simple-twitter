import style from "./UserTweetPage.module.scss";
import Navbar from "../../components/Main/Navbar/Navbar";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import UserInfo from "../../components/Main/Navbar/UserInfo/UserInfo";
import CurrentUser from "../../components/Main/CurrentUser/CurrentUser";
import UserToggleMenu from "../../components/Main/UserToggleMenu/UserToggleMenu";
import TweetItem from "../../components/Main/TweetItem/TweetItem";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserTweet } from '../../api/tweet.js'
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useDataChange } from "../../contexts/DataChangeContext";


const UserTweetPage = () => {
  const { userId } = useParams();
  const [tweets, setTweets] = useState([]);
  const URL = useParams();
  const { isAuthenticated, identified, role } = useAuthContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isDataChange } = useDataChange(); 

  //headers
  const linkList = [
    { title: "推文", link: `/user/${userId}/tweet` },
    { title: "推文與回覆", link: `/user/${userId}/reply` },
    { title: "喜歡的內容", link: `/user/${userId}/like` },
  ];
  

  //for tweet mapping
  useEffect(() => {
    const getUserAllTweets = async () => {
      try {
        const data = await getUserTweet(URL.userId);
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
      console.log("isDataChange changed:", isDataChange);
    };
    getUserAllTweets();
    
  }, [URL.userId, isDataChange]);

  //tweets mapping
  const tweetsList = tweets.map((props) => {
    return (
      <TweetItem
        key={props.id}
        tweetId={props.id}
        description={props.description}
        likedCount={props.likedCount}
        replyCount={props.replyCount}
        createdAt={props.createdAt}
        userId={props.User.id}
        userName={props.User.userName}
        account={props.User.account}
        avatar={props.User.avatar}
        isLiked={props.isLiked}
      />
    );
  });


  //prohibited and redirection
  useEffect(() => {
    if (identified) {
      if (role === "admin") {
        if (!isAuthenticated) {
          navigate("/admin/login");
        } else {
          navigate("/admin/tweet");
        }
      } else if (!isAuthenticated) {
        navigate("/login");
      }
    }
  }, [pathname, navigate, isAuthenticated, identified, role]);

  return (
    <MainLayout>
      <Navbar hasBack={true}>
        <UserInfo />
      </Navbar>
      <CurrentUser />
      <UserToggleMenu linkList={linkList} />
      <div className={style.tweetList}>
        {tweetsList}
      </div>
    </MainLayout>
  );
}

export default UserTweetPage;