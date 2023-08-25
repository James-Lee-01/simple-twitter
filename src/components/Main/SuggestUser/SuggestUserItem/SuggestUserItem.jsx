import style from './SuggestUserItem.module.scss';

function SuggestUserItem({user}) {

    return <div className={style.suggestUserItem}>
        <div className={style.userWrapper}>
            <div className={style.userAvatar}>
                <div className={style.avatar}></div>
            </div>
            <div className={style.userInfo}>
                <span className={style.userName}>{user.name}</span>
                <span className={style.userAccount}>@{user.account}</span>
            </div>
        </div>
        <div className={style.followButton}>
            {user.isFollowing ?
                <button className={style.following}>正在跟隨</button> :
                <button className={style.unfollow}>跟隨</button>
            }
        </div>
    </div>
}

export default SuggestUserItem;