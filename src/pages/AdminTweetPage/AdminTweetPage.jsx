import style from "./AdminTweetPage.module.scss";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import Navbar from "../../components/Main/Navbar/Navbar";
// import TweetItem from "../../components/Main/TweetItem/TweetItem";
import AdminContainer from "./AdminContainer/AdminContainer";
// import tweetCancelImage from "../../assets/icons/tweet/tweet_cancel.png";
import AdminTweetItem from "../../components/AdminTweetItem/AdminTweetItem.jsx";
import { useState, useEffect } from "react";
import { adminGetAllTweets, deleteAdminTweet } from "../../api/tweet";

import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";

function AdminTweetPage() {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [tweets, setTweets] = useState([]);

  ////// for DeleteTweets
  const handleDelete = async (tweetId) => {
    // console.log(tweetId)
    try {
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (confirmed) {
        await deleteAdminTweet(tweetId);
        setTweets((tweets) => {
          return tweets.filter((tweet) => tweet.id !== tweetId);
        });
        console.log(`刪除推文成功： ${tweetId}`);
      }
    } catch (error) {
      console.error("刪除推文失敗", error);
    }
  };

  useEffect(() => {
    const adminAllTweets = async () => {
      try {
        const data = await adminGetAllTweets();
        if (data.status === "error") {
          console.log(data);
          return;
        }
        if (data) {
          setTweets(data);
        }
        return;
      } catch (error) {
        console.error("[Admin Get All Tweets Failed]", error);
      }
    };
    adminAllTweets();
  }, []);

  //prohibited
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [pathname, navigate, isAuthenticated]);

  const tweetListAll = tweets.map((props) => {
    return (
      <AdminTweetItem
        key={props.id}
        tweetId={props.id}
        avatar={props.User.avatar}
        name={props.User.name}
        account={props.User.account}
        createdAt={props.createdAt}
        description={props.description}
        onClick={handleDelete}
      />
    );
  });

  return (
    <MainLayout extendMainContainer={true} isAdmin={true}>
      <Navbar title='推文清單' />
      <AdminContainer>
        <div className={style.tweetList}>{tweetListAll}</div>
      </AdminContainer>
    </MainLayout>
  );
}

export default AdminTweetPage;


/* {tweetList.map((user, index) => (
<div className={style.tweetItem} key={index}>
  <div className={style.tweetContent}>
    <TweetItem user={user} />
    <button className={style.deleteButton} onClick={() => handleDeleteTweet(index)}>
      <img src={tweetCancelImage} alt="Delete" style={{ width: '24px', height: '24px' }} />
    </button>
  </div>
</div> */
