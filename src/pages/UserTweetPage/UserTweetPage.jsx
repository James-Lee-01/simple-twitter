import style from "./UserTweetPage.module.scss";
import Navbar from "../../components/Main/Navbar/Navbar";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import UserInfo from "../../components/Main/Navbar/UserInfo/UserInfo";
import CurrentUser from "../../components/Main/CurrentUser/CurrentUser";
import TweetItem from "../../components/Main/TweetItem/TweetItem";
import UserToggleMenu from "../../components/Main/UserToggleMenu/UserToggleMenu";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


const userInfo = {
    "name": "John Doe",
    "account": "heyJohn",
    "following": "34",
    "follower": "59",
}

const tweetsList = [
    {
        "name": "John Doe",
        "account": "heyJohn",
        "time": "3 小時",
        "replyCount": "13",
        "likeCount": "76"
    },
]

const UserTweetPage = () => {
  const { userId } = useParams();
	const [tweets, setTweets] = useState([]);


  ///////////////////
  const linkList = [
    { title: "推文", link: `/user/${userId}/tweet` },
    { title: "推文與回覆", link: `/user/${userId}/reply` },
    { title: "喜歡的內容", link: `/user/${userId}/like` },
  ];
  ///////////////////

  // // for tweet mapping
  // useEffect(() => {
  //   const getAllTweets = async () => {
  //     try {
  //       const data = await getUserTweet();
  //       //若狀態顯示失敗，回傳訊息
  //       if (!data) {
  //         // console.log("data failed");
  //         return;
  //       }
  //       //若狀態顯示成功則直接擷取資料
  //       if (data) {
  //         setTweets(data); //回傳資料格式
  //         // console.log('data get!');
  //       }
  //     } catch (error) {
  //       console.log("推文擷取失敗", error);
  //     }
  //   };
  //   getAllTweets();
  // }, []);

  // const tweetsList = tweets.map((props) => {
  //   return (
  //     <TweetItem
  //       key={props.id}
  //       tweetId={props.id}
  //       userId={props.userId}
  //       userName={props.User.name}
  //       account={props.User.account}
  //       avatar={props.User.avatar}
  //       description={props.description}
  //       likedCount={props.likedCount}
  //       replyCount={props.replyCount}
  //       isLiked={props.isLiked}
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
        {Array.from(Array(16)).map((_, index) => (
          <TweetItem user={tweetsList[0]} />
        ))}
        {/* {tweetsList} */}
      </div>
    </MainLayout>
  );
}

export default UserTweetPage;