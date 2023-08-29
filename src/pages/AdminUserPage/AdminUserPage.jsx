import style from "./AdminUserPage.module.scss";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import Navbar from "../../components/Main/Navbar/Navbar";
import UserCard from "../../components/AdminUserCard/AdminUserCard";

// import { getAdminUsers } from '../../api/auth.js'
import {  useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminUserPage() {
	// const [users, setUsers] = useState([])
	// const [isAuthenticated] = useAuthContext()
	// const navigate = useNavigate()

	const userList = [
			{
					"name": "John Doe",
					"account": "heyJohn",
					"reply": "1.5k",
					"like": "20k",
					"following": 34,
					"follower": 59,
			},
			{
					"name": "Robert Fox",
					"account": "robfox",
					"reply": "1.5k",
					"like": "20k",
					"following": 34,
					"follower": 59,
			},
	]
	// useEffect(() => {
	// 	if (!isAuthenticated) {
	// 		navigate('/admin/login')
	// 	}
	// }, [navigate, isAuthenticated])

	// useEffect(() => {
  //   const adminGetUsers = async () => {
  //     try {
  //       const data = await getAdminUsers();
  //       //若狀態顯示失敗，回傳訊息
  //       if (!data) {
  //         console.log("data failed");
  //         return;
  //       }
  //       //若狀態顯示成功則直接擷取資料
  //       if (data) {
  //         setUsers(data); //回傳資料格式
  //         console.log('data get!', data);
  //       }
  //     } catch (error) {
  //       console.error("推文擷取失敗", error);
  //     }
  //   };
	// 	adminGetUsers()
  // }, [])

	// const userCardList = users.map((user) => {
	// 	return (
	// 		<UserCard
	// 			key={user.userId}
	// 			coverPhoto={user.coverPhoto}
	// 			avatar={user.avatar}
	// 			name={user.name}
	// 			account={user.account}
	// 			tweetCount={user.tweetCount}
	// 			likeCount={user.likeCount}
	// 			followingNum={user.followingNum}
	// 			followerNum={user.followerNum}
	// 		/>
	// 	);
	// })

    return (
      <MainLayout extendMainContainer={true} isAdmin={true}>
        <Navbar title='使用者列表' />
        <div className={style.userList}>
          { Array.from(Array(16)).map((_, index) => <UserCard user={userList[index % 2]} />)}
          {/* { userCardList } */}
        </div>
      </MainLayout>
    );
}

export default AdminUserPage;