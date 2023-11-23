import style from "./AdminUserPage.module.scss";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import Navbar from "../../components/Main/Navbar/Navbar";
import UserCard from "../../components/AdminUserCard/AdminUserCard";
import { getAdminUsers } from '../../api/auth.js'
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";


function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const { isAuthenticated, identified, role } = useAuthContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  //prohibited and redirection
  useEffect(() => {
    if (identified) {
      if (role === "user") {
        if (!isAuthenticated) {
          navigate("/login");
        } else {
          navigate("/");
        }
      } else if (!isAuthenticated) {
        navigate("/admin/login");
      }
    }
  }, [pathname, navigate, isAuthenticated, identified, role]);

  useEffect(() => {
    const adminGetUsers = async () => {
      try {
        const data = await getAdminUsers();
        //若狀態顯示失敗，回傳訊息
        if (!data) {
          console.log("data failed");
          return;
        }
        //若狀態顯示成功則直接擷取資料
        if (data) {
          setUsers(data); //回傳資料格式
          console.log("data get!", data);
        }
      } catch (error) {
        console.error("getAdminUsers Failed", error);
      }
    };
    adminGetUsers();
  }, []);

  //data list mapping
  const userCardList = users.map((user) => {
    return (
      <UserCard
        key={user.id}
        coverPhoto={user.cover}
        avatar={user.avatar}
        name={user.name}
        account={user.account}
        tweetCount={user.tweetCount}
        likeCount={user.tweetLikeCount}
        followingNum={user.followingCount}
        followerNum={user.followerCount}
      />
    );
  });

  return (
    <MainLayout extendMainContainer={true} isAdmin={true}>
      <Navbar title='使用者列表' />
      <div className={style.userList}>
        {userCardList}
      </div>
    </MainLayout>
  );
}

export default AdminUserPage;