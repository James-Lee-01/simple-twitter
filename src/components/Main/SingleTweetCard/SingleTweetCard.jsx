import styles from './SingleTweetCard.module.scss'
import replyIcon from "../../../assets/icons/tweet/tweet_reply.png";
import likeIcon from "../../../assets/icons/tweet/tweet_like.png";
import loog_gray from '../../../assets/icons/logo_gray.png'
import { Link } from "react-router-dom";
import { useState } from 'react';
import clsx from 'clsx';
import { getDetailedTime } from '../../../api/tweet';
import { postLike, postUnlike } from '../../../api/tweet';




export default function SingleTweetCard({ onClick, props, userProps }) {
    // console.log("7", props);

	const tweetId = props.id; //For Like checking
	const userId = props.userId;
  const userName = userProps.name;
  const account = userProps.account;
  const avatar = userProps.avatar;
  const description = props.description;
  const isLiked = props.isLiked;
	const likedCount = props.likedCount;
  const replyCount = props.replyCount;
  const createdAt = props.createdAt;

	const [liked, setLiked] = useState(isLiked);
	const [likedNum, setLikedNum] = useState(likedCount);
	const likedClassName = clsx(styles.likedBtn, { [styles.active]: liked });


	const handleLike = async () => {
    try {
      if (Boolean(liked) === false) {
        //false情況下，點下表示按讚
        await postLike(tweetId);
        setLiked(true);
        setLikedNum(likedNum + 1);
      }
      if (Boolean(liked) === true) {
        //相反的是取消讚
        await postUnlike(tweetId);
        setLiked(false);
        setLikedNum(likedNum - 1);
      }
    } catch (error) {
      console.error("[Press Like Failed]", error);
    }
  };

  
  return (
    <div className={styles.tweet}>
      <Link to={`/user/${userId}/tweet`}>
        <div className={styles.userInfo}>
          <div className={styles.userInfoAvatar}>
            <img
              src={avatar || loog_gray}
              alt='avatar'
              className={styles.tweetAvatar}
            />
          </div>
          <div className={styles.userInfoCard}>
            <div className={styles.userInfoName}>{userName}</div>
            <div className={styles.userInfoAccount}>@{account}</div>
          </div>
        </div>
      </Link>
      <div className={styles.tweetContent}>{description}</div>

      <span className={styles.time}>{getDetailedTime(createdAt)}</span>
      <div className={styles.line}></div>
      <div className={styles.likeReplyBox}>
        <div className={styles.counts}>
          <span className={styles.replyCount}>{ replyCount }</span>
          <span className={styles.count}> 回覆</span>
        </div>

        <div className={styles.likeCount}>
          { likedNum }
          <span className={styles.like}> 喜歡次數</span>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.icons}>
        <div className={styles.iconReply} onClick={onClick}>
          <img className={styles.replyBtn} src={replyIcon} alt='replyBtn' />
        </div>

        <div className={styles.iconLike} onClick={handleLike}>
          <div className={styles.cursor}>
            <img className={likedClassName} src={likeIcon} alt='likeBtn' />
          </div>
        </div>
      </div>
    </div>
  );
}