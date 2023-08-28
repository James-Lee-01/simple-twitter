import style from "./AdminUserPage.module.scss";
import MainLayout from "../../components/Main/MainLayout/MainLayout";
import Navbar from "../../components/Main/Navbar/Navbar";
import UserCard from "./UserCard/UserCard";

function AdminUserPage() {
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
    return <MainLayout extendMainContainer={true} isAdmin={true} >
        <Navbar title="使用者列表" />
        <div className={style.userList}>
            { Array.from(Array(16)).map((_, index) => <UserCard user={userList[index % 2]} />)}
            
        </div>
    </MainLayout>
}

export default AdminUserPage;