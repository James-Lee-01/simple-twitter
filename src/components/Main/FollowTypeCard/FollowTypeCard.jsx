import style from "./FollowTypeCard.module.scss";

const FollowTypeCard = ({user}) => {
    return <div className={style.follow}>
    <div className={style.followAvatar}>
        <div className={style.avatar}></div>
    </div>
    <div className={style.followInfo}>
        <div className={style.followWrap}>
            <div className={style.followUser}>
                <span className={style.followName}>{user.name}</span>
                <span className={style.followAccount}>@{user.account}</span>
            </div>
            <div className={style.followTypeButton}>
                { user.isFollowing ? 
                    <button className={style.followingButton}>正在跟隨</button> :
                    <button className={style.followButton}>跟隨</button>
                }
            </div>
        </div>
        <div class={style.followContent}>
            <p>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
            </p>
        </div>
    </div>
</div>
}

export default FollowTypeCard;