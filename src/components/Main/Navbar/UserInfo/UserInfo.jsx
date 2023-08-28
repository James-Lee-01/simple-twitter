import style from "./UserInfo.module.scss";

function UserInfo() {
    return <div className={style.userInfoContainer}>
        <div className={style.userName}>
            John Doe
        </div>
        <div className={style.followCount}>
            25 推文
        </div>
    </div>
}

export default UserInfo;