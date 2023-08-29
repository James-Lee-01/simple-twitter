import styles from './SingleTweetCard.module.scss'
import replyIcon from "../../../assets/icons/tweet/tweet_reply.png";
import likeIcon from "../../../assets/icons/tweet/tweet_like.png";
import loog_gray from '../../../assets/icons/logo_gray.png'
import { Link } from "react-router-dom";
import { useState } from 'react';
import clsx from 'clsx';
import { getDetailedTime } from '../../../api/tweet';



export default function SingleTweetCard({ onClick, props, userProps }) {
	const tweetId = props.tweetId; //For Like checking
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


	const handleLike = () => {
    try {
      if (liked === false) {
        //false情況下，點下表示按讚
        setLiked(true);
        setLikedNum(likedNum + 1);
      } else {
        //相反的是取消讚
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
          <span className={styles.replyCount}>{replyCount}&nbsp;</span>
          <span className={styles.count}>回覆</span>
        </div>

        <div className={styles.likeCount}>
          {likedCount}&nbsp;
          <span className={styles.like}>喜歡次數</span>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.icons}>
        <div className={styles.iconReply} onClick={onClick}>
          <img className={styles.replyBtn} src={replyIcon} alt='reply button' />
        </div>

        <div className={styles.iconLike} onClick={handleLike}>
          <div className={styles.cursor}>
            <img className={likedClassName} src={likeIcon} alt='like button' />
          </div>
        </div>
      </div>
      {/* <div className={styles.rwdSection} onClick={onClick}> */}
      {/* <div className={styles.userInfoAvatar}> */}
      {/* <img src={avatar} alt='avatar' className={styles.tweetAvatar} /> */}
      {/* </div> */}
      {/* <div className={styles.rwdTitle}>推你的回覆</div> */}
      {/* <Button title='回覆' size='small' isAction></Button> */}
      {/* </div> */}
    </div>
  );
}