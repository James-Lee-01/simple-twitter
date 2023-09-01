import Navbar from "../../components/Main/Navbar/Navbar";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import UserInfo from "../../components/Main/Navbar/UserInfo/UserInfo";
import FollowTypeCard from "../../components/Main/FollowTypeCard/FollowTypeCard";
import UserToggleMenu from "../../components/Main/UserToggleMenu/UserToggleMenu";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserFollower } from "../../api/tweet";

import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const UserFollowerPage = () => {
  const { userId } = useParams();
  const URL = useParams();
  const [usersList, setUsersList] = useState([]);

    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();
    const { pathname } = useLocation();

  const linkList = [
    { title: "跟隨者", link: `/user/${userId}/follower` },
    { title: "正在跟隨", link: `/user/${userId}/following` },
  ];

  ///////Get Follower Data API//////
  useEffect(() => {
    const getUserFollowingList = async () => {
      try {
        const data = await getUserFollower(URL.userId);
        if (data) {
          setUsersList(data);
          console.log("7", data);
        }
        if (!data) {
          console.log("No data");
          return;
        }
      } catch (error) {
        console.log("getUserFollowerList Failed", error);
      }
    };
    getUserFollowingList();
  }, [URL.userId]);

  const followerUsers = usersList.map((user) => {
    return (
      <FollowTypeCard
        key={user.followingId}
        userId={user.followingId}
        name={user.name}
        avatar={user.avatar}
        introduction={user.introduction}
        isFollowed={user.isFollowed}
      />
    );
  });

  //頁面導向限制
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [pathname, navigate, isAuthenticated]);

  return (
    <MainLayout>
      <Navbar hasBack={true}>
        <UserInfo />
      </Navbar>
      <UserToggleMenu linkList={linkList} />
      <div>{followerUsers}</div>
    </MainLayout>
  );
}

export default UserFollowerPage;