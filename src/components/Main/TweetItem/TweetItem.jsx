import style from './TweetItem.module.scss';
import likeIcon from '../../../assets//icons/tweet/tweet_like.png';
import replyIcon from '../../../assets//icons/tweet/tweet_reply.png';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import clsx from 'clsx';
import logo_gray from '../../../assets/icons/logo_gray.png'


function TweetItem(props) {
	const key = props.tweetId;
	const tweetId = props.tweetId;
	const userId = props.userId
	const userName = props.userName;
	const account = props.account
	const avatar = props.avatar
	const description = props.description
	const likedCount = props.likedCount
	const replyCount = props.replyCount
	const isLiked = props.isLiked
	const createdAt = props.createdAt


	const [ liked, setLiked ] = useState(isLiked)
	const likedClassName = clsx(style.likedBtn, {[style.active]: liked})
	const [ likedNum, setLikedNum ] = useState(likedCount)


	const handleLike =  () => {
		try {
			if (liked === false) {
				//false情況下，點下表示按讚
				setLiked(true)
				setLikedNum(likedNum + 1);
			} else {
				//相反的是取消讚
				setLiked(false)
				setLikedNum(likedNum - 1);
			}
		} catch (error) {
			console.error('[Press Like Failed]', error)
		}
	}

	return (
    <div className={style.tweet} id={key}>
      <Link to={`/user/${userId}/tweet`}>
        <div className={style.tweetAvatar}>
          <div className={style.avatar}>
            <img
              className={style.avatarImg}
              src={avatar || logo_gray}
              alt='avatar'
            />
          </div>
        </div>
      </Link>

      <div className={style.postInfo}>
        <Link to={`/user/${userId}/tweet`}>
          <div className={style.tweetPoster}>
            <span className={style.posterName}>{userName}</span>
            <span className={style.posterAccount}>
              @{account}‧{createdAt}
            </span>
          </div>
        </Link>

        <Link to={`/tweet/${tweetId}`}>
          <div className={style.postContent}>
            <p>{description}</p>
          </div>
        </Link>

        <div className={style.postAction}>
          <Link to={`/tweet/${tweetId}`}>
            <div>
              <img src={replyIcon} alt='reply icon' />
              <span>{replyCount}</span>
            </div>
          </Link>

          <div className={style.likedBtn} onClick={handleLike}>
            <img className={likedClassName} src={likeIcon} alt='like icon' />
            <span>{likedCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetItem;