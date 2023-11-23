import style from "./UserReplyPage.module.scss";
import Navbar from "../../components/Main/Navbar/Navbar";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import UserInfo from "../../components/Main/Navbar/UserInfo/UserInfo";
import CurrentUser from "../../components/Main/CurrentUser/CurrentUser";
import UserToggleMenu from "../../components/Main/UserToggleMenu/UserToggleMenu";
import SingleUserReply from "../../components/Main/ReplyListCard/SingleUserReply";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserReply } from "../../api/tweet";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";


const UserReplyPage = () => {
  const { userId } = useParams();
  const URL = useParams();
  const [userReply, setUserReply] = useState([]);

  const { isAuthenticated, identified, role } = useAuthContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const linkList = [
    { title: "推文", link: `/user/${userId}/tweet` },
    { title: "推文與回覆", link: `/user/${userId}/reply` },
    { title: "喜歡的內容", link: `/user/${userId}/like` },
  ];

  // for tweet mapping
  useEffect(() => {
    const getUserReplyTweets = async () => {
      try {
        const data = await getUserReply(URL.userId);
        //若狀態顯示失敗，回傳訊息
        if (!data) {
          console.log("data failed", data.message);
          return;
        }
        //若狀態顯示成功則直接擷取資料
        if (data) {
          setUserReply(data); //回傳資料格式
        }
      } catch (error) {
        console.log("喜愛推文擷取失敗", error);
      }
    };
    getUserReplyTweets();
  }, [URL.userId]);

  //tweets mapping
  const replyTweetsList = userReply.map((props) => {
    return (
      <SingleUserReply
        key={props.id}
        createdAt={props.createdAt}
        tweetAccount={props.Tweet.User.name}
        const
        comment={props.comment}
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
    } else if (!isAuthenticated) {
      navigate("/login");
    }
  }, [pathname, navigate, isAuthenticated, identified, role]);

  return (
    <MainLayout>
      <Navbar hasBack={true}>
        <UserInfo />
      </Navbar>
      <CurrentUser />
      <UserToggleMenu linkList={linkList} />
      <div className={style.replyList}>{replyTweetsList}</div>
    </MainLayout>
  );
}

export default UserReplyPage;