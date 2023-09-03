import style from "./UserCard.module.scss";
import ReplyIcon from "../../../assets/icons/tweet/tweet_reply.png";
import LikeIcon from "../../../assets/icons/tweet/tweet_like.png";

//USer info card
function UserCard({user}) {
    return <div className={style.cardWrapper}>
        <div className={style.coverPhoto}></div>
        <div className={style.userAvatar}>
            <div className={style.avatar}>
            </div>
        </div>
        <div className={style.cardFooter}>
            <div className={style.userInfo}>
                <span className={style.userName}>{user.name}</span>
                <span className={style.userAccount}>@{user.account}</span>
            </div>
            <div className={style.action}>
                <img src={ReplyIcon} alt="" />
                <span>{user.reply}</span>
                <img src={LikeIcon} alt="" />
                <span>{user.like}</span>
            </div>
            <div className={style.followInfo}>
                <span>{user.following} 個</span>跟隨中
                <span>{user.follower} 位</span>跟隨者
            </div>
        </div>
    </div>
}

export default UserCard;