import Navbar from "../../components/Main/Navbar/Navbar";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import UserInfo from "../../components/Main/Navbar/UserInfo/UserInfo";
import FollowTypeCard from "../../components/Main/FollowTypeCard/FollowTypeCard";
import UserToggleMenu from "../../components/Main/UserToggleMenu/UserToggleMenu";
import { useParams } from "react-router-dom";

const UserFollowingPage = () => {
  const { userId } = useParams();

  const linkList = [
    { title: "跟隨者", link: `/user/${userId}/follower` },
    { title: "正在跟隨", link: `/user/${userId}/following` },
  ];

  const userList = [
    {
      "name": "test1",
      "account": "test1",
      "isFollowing": true
    },
    {
      "name": "test2",
      "account": "test2",
      "isFollowing": false
    },
    {
      "name": "test3",
      "account": "test3",
      "isFollowing": false
    },
    {
      "name": "test4",
      "account": "test4",
      "isFollowing": false
    },
    {
      "name": "test5",
      "account": "test5",
      "isFollowing": false
    },
    {
      "name": "test6",
      "account": "test6",
      "isFollowing": false
    },
    {
      "name": "test7",
      "account": "test7",
      "isFollowing": false
    },
    {
      "name": "test8",
      "account": "test8",
      "isFollowing": false
    },
    {
      "name": "test9",
      "account": "test9",
      "isFollowing": false
    },
    {
      "name": "test10",
      "account": "test10",
      "isFollowing": false
    },
  ]

  const followingUsers = userList.filter(user => user.isFollowing);

  return <MainLayout>
    <Navbar hasBack={true} >
      <UserInfo />
    </Navbar>
    <UserToggleMenu linkList={linkList} />
    {followingUsers.map((user) => <FollowTypeCard user={user} key={user.account} />)}



  </MainLayout>
}

export default UserFollowingPage;