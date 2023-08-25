import style from './TweetItem.module.scss';
import likeIcon from '../../../assets//icons/tweet/tweet_like.png';
import replyIcon from '../../../assets//icons/tweet/tweet_reply.png';

function TweetItem({user}) {
    return <div className={style.tweet}>
        <div className={style.tweetAvatar}>
            <div className={style.avatar}></div>
        </div>
        <div className={style.postInfo}>
            <div className={style.tweetPoster}>
                <span className={style.posterName}>{user.name}</span>
                <span className={style.posterAccount}>@{user.account}‧{user.time}</span>
            </div>
            <div class={style.postContent}>
                <p>
                    Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.
                </p>
            </div>
            <div class={style.postAction}>
                <div>
                    <img src={replyIcon} alt="" />
                    <span>{user.replyCount}</span>
                </div>
                <div>
                    <img src={likeIcon} alt="" />
                    <span>{user.likeCount}</span>
                </div>
            </div>
        </div>
    </div>
}

export default TweetItem;