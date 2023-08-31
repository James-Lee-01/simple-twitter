import style from "./UserTweetPage.module.scss";
import Navbar from "../../components/Main/Navbar/Navbar";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import UserInfo from "../../components/Main/Navbar/UserInfo/UserInfo";
import CurrentUser from "../../components/Main/CurrentUser/CurrentUser";
import UserToggleMenu from "../../components/Main/UserToggleMenu/UserToggleMenu";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserTweet } from '../../api/tweet.js'

// import SingleUserTweet from "../../components/Main/TweetItem/SingleUserTweet";
import TweetItem from "../../components/Main/TweetItem/TweetItem";


const UserTweetPage = () => {
  const { userId } = useParams();
	const [tweets, setTweets] = useState([]);
  const URL = useParams()


  ///////////////////
  const linkList = [
    { title: "推文", link: `/user/${userId}/tweet` },
    { title: "推文與回覆", link: `/user/${userId}/reply` },
    { title: "喜歡的內容", link: `/user/${userId}/like` },
  ];
  ///////////////////

  // // for tweet mapping
  useEffect(() => {
    const getAllUserTweets = async () => {
      try {
        const data = await getUserTweet(URL.userId);
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
    getAllUserTweets();
  }, []);


  const tweetsList = tweets.map((props) => {
    console.log('2',props)
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
  // const tweetsList = tweets.map((props) => {
  //   return (
  //     <SingleUserTweet
  //       key={props.id}
  //       tweetId={props.id}
  //       description={props.description}
  //       likedCount={props.likedCount}
  //       replyCount={props.replyCount}
  //       createdAt={props.createdAt}
  //     />
  //   );
  // });

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