import style from "./UserLikePage.module.scss";
import Navbar from "../../components/Main/Navbar/Navbar";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import UserInfo from "../../components/Main/Navbar/UserInfo/UserInfo";
import CurrentUser from "../../components/Main/CurrentUser/CurrentUser";
import TweetItem from "../../components/Main/TweetItem/TweetItem";
import UserToggleMenu from "../../components/Main/UserToggleMenu/UserToggleMenu";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserLike } from "../../api/tweet";


const UserLikePage = () => {
  const { userId } = useParams();

  const URL = useParams();
  const [userLike, setUserLike] = useState([]);

  const linkList = [
    { title: "推文", link: `/user/${userId}/tweet` },
    { title: "推文與回覆", link: `/user/${userId}/reply` },
    { title: "喜歡的內容", link: `/user/${userId}/like` },
  ];

  //////////////////////
  // for tweet mapping

  useEffect(() => {
    const getUserLikeTweets = async () => {
      try {
        const data = await getUserLike(URL.userId);
        //若狀態顯示失敗，回傳訊息
        if (!data) {
          console.log("data failed", data.message);
          return;
        }
        //若狀態顯示成功則直接擷取資料
        if (data) {
          setUserLike(data); //回傳資料格式
          // console.log("data get!", data);
        }
      } catch (error) {
        console.log("喜愛推文擷取失敗", error);
      }
    };
    getUserLikeTweets();
  }, [URL.userId]);


  const likeTweetsList = userLike.map((props) => {
    // console.log(" get!", props);
    return (
      <TweetItem
        key={props.id}
        tweetId={props.tweetId}
        userId={props.UserId}
        userName={props.Tweet.User.name}
        account={props.Tweet.User.account}
        avatar={props.Tweet.User.avatar}
        description={props.Tweet.description}
        likedCount={props.Tweet.likedCount}
        replyCount={props.Tweet.replyCount}
        isLiked={props.Tweet.isLiked}
        createdAt={props.Tweet.createdAt}
      />
    );
  });

  return (
    <MainLayout>
      <Navbar hasBack={true}>
        <UserInfo />
      </Navbar>
      <CurrentUser />
      <UserToggleMenu linkList={linkList} />
      <div className={style.tweetList}>
        {likeTweetsList}
        {/* {
        Array.from(Array(16)).map((_, index) => <TweetItem user={TweetList[0]} />)
      } */}
      </div>
    </MainLayout>
  );
}

export default UserLikePage;