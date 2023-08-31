import Navbar from "../../components/Main/Navbar/Navbar";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import UserInfo from "../../components/Main/Navbar/UserInfo/UserInfo";
import FollowTypeCard from "../../components/Main/FollowTypeCard/FollowTypeCard";
import UserToggleMenu from "../../components/Main/UserToggleMenu/UserToggleMenu";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserFollowing } from "../../api/tweet";

const UserFollowingPage = () => {
  const { userId } = useParams();
  const URL = useParams()
  const [usersList, setUsersList] = useState([])


  const linkList = [
    { title: "跟隨者", link: `/user/${userId}/follower` },
    { title: "正在跟隨", link: `/user/${userId}/following` },
  ];

  ///////Get Following Data API//////
  useEffect(() => {
    const getUserFollowingList = async () => {
      try {
        const data = await getUserFollowing(URL.userId);
        if (data) {
          setUsersList(data);
          // console.log("7", data);
        }
        if (!data) {
          console.log('No data');
          return;
        }
      } catch (error) {
        console.log("getUserFollowingList Failed", error);
      }
    };
    getUserFollowingList();
  }, [URL.userId]);



  

  const followingUsers = usersList.map((user) => {
    return (
      <FollowTypeCard
        key = {user.followingId}
        userId={user.followingId}
        name={user.name}
        avatar={user.avatar}
        introduction={user.introduction}
        isFollowed={user.isFollowed}
      />
    );
  });

  return (
    <MainLayout>
      <Navbar hasBack={true}>
        <UserInfo />
      </Navbar>
      <UserToggleMenu linkList={linkList} />
      <div>{followingUsers}</div>
    </MainLayout>
  );
}

export default UserFollowingPage;