import style from "./AdminTweetPage.module.scss";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import Navbar from "../../components/Main/Navbar/Navbar";
import AdminContainer from "./AdminContainer/AdminContainer";
import AdminTweetItem from "../../components/AdminTweetItem/AdminTweetItem.jsx";
import { useState, useEffect } from "react";
import { adminGetAllTweets, deleteAdminTweet } from "../../api/tweet";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";

function AdminTweetPage() {
  const { role } = useAuthContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [tweets, setTweets] = useState([]);

  ////// for DeleteTweets
  const handleDelete = async (tweetId) => {
    try {
      const confirmed = window.confirm("您確定要刪除此篇推文嗎?");
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

  //prohibited and redirection
  useEffect(() => {
    if (role === "user") {
      navigate("/");
    } else if (role === null) {
      navigate("/login");
    }
    console.log("page role", role);
  }, [pathname, navigate, role]);

  //data list mapping
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