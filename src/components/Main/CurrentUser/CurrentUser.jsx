import style from "./CurrentUser.module.scss";

const CurrentUser = ({ user }) => {
    return <div className={style.userWrapper}>
        <div className={style.coverPhoto}></div>
        <div className={style.userAvatar}>
            <div className={style.avatar}>
            </div>
        </div>
        <div className={style.userInfo}>
            <div className={style.editButton}>
                <button>編輯個人資料</button>
            </div>
            <span className={style.userName}>{user.name}</span>
            <span className={style.userAccount}>@{user.account}</span>
            <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </p>
            <div className={style.followInfo}>
                <span>{user.following} 個</span>跟隨中
                <span>{user.follower} 位</span>跟隨者
            </div>
        </div>
    </div>
}

export default CurrentUser;