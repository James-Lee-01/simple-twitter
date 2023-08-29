import { getRelativeTime } from '../../../utility/helper.js';
import { Link } from 'react-router-dom';

import styles from './ReplyItem.module.scss';

export default function ReplyItem(props) {
  const avatar = props.avatar;
  const account = props.account;
  const userName = props.name;
  const createdAt = props.createdAt;
  const tweetAccount = props.tweetAccount;
  const userId = props.userId;
  const comment = props.comment;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.left}>
        <Link to={`/user/${userId}/tweet`}>
          <div className={styles.avatarContainer}>
            <img className={styles.tweetAvatar} src={avatar} alt="avatar" />
          </div>
        </Link>
      </div>
      <div className={styles.right}>
        <Link to={`/user/${userId}/tweet`}>
          <div className={styles.tweetUserInfo}>
            <span className={styles.tweetUserName}>{userName}</span>
            <span className={styles.tweetUserAccount}>
              @{account}&#xb7;{getRelativeTime(createdAt)}
            </span>
          </div>
        </Link>
        <div className={styles.replyAddress}>
          <span className={styles.replyWord}>回覆給</span>
          <span className={styles.replyAccount}> @{tweetAccount}</span>
        </div>
        <div className={styles.tweetContent}>{comment}</div>
      </div>
    </div>
  );
}
