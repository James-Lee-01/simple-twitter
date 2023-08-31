import { useState } from 'react';
import { Toast } from '../../../api/reply.js';
import { getRelativeTime } from '../../../api/tweet.js';
import { useAuthContext } from "../../../contexts/AuthContext.jsx";
import { useDataStatus } from '../../../contexts/DataContext.jsx'
import clsx from 'clsx';
import usePostReply from '../../../hooks/usePostReply.js'
import Button from '../../Button/Button.jsx';

import modal_esc from '../../../assets/icons/modal/modal_esc.png';
import styles from './SingleTweetReplyModal.module.scss';

export default function SingleTweetReplyModal({ handleCloseModal, props }) {
  const [textInput, setTextInput] = useState('');
  const { currentUser } = useAuthContext();
  const { isDataUpdate, setIsDataUpdate } = useDataStatus();
  const { isUpdating, postReplyHook } = usePostReply();
  

  const warningClassName = clsx(styles.waring, { [styles.active]: textInput.length > 140 });
  const headsUpClassName = clsx(styles.headsUp, { [styles.active]: textInput.length === 0 });
  const bodyClassName = clsx(styles.body, { [styles.active]: textInput.length > 0 });

  const tweetId = props.id;
  const userName = props.User.name;
  const account = props.User.account;
  const avatar = props.User.avatar;
  const description = props.description;
  const createdAt = props.createdAt;

  const handlePostReply = async () => {
    if (textInput.trim().length === 0) {
      setTextInput('');
      Toast.fire({
        title: '內容不可空白',
        icon: 'error',
      });
      return;
    }
    if (textInput.length > 140) return;
    await postReplyHook(textInput, tweetId)
    await setTextInput('');
    await setIsDataUpdate(!isDataUpdate)
    // setIsUpdating(true);


  };


  const handleCloseModalAtBg = (e) => {
    if (!isUpdating) {
      if (e.target.classList.contains(styles.modalOverlay)) {
        handleCloseModal();
      }
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={handleCloseModalAtBg}>
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <div onClick={handleCloseModal}>
            <img className={styles.modalEsc} src={modal_esc} alt="modal esc" />
          </div>
          <div className={styles.rwdBtnContainer}>
            <Button title="回覆" size="small" isAction onClick={handlePostReply}></Button>
          </div>
        </div>
        <div className={styles.tweet}>
          <div className={styles.left}>
            <div className={styles.avatarContainer}>
              <img className={styles.avatar} src={avatar} alt="avatar" />
            </div>
            <span className={styles.line}></span>
          </div>
          <div className={styles.right}>
            <div className={styles.tweetUserInfo}>
              <span className={styles.tweetUserName}>{userName}</span>
              <span className={styles.tweetUserAccount}>
                @{account}
                <span className={styles.time}>&#xb7;{getRelativeTime(createdAt)}</span>
              </span>
            </div>
            <div className={styles.tweetContent}>{description}</div>
            <div className={styles.replyAddress}>
              <span className={styles.replyWord}>回覆給</span>
              <span className={styles.replyAccount}>@{account}</span>
            </div>
          </div>
        </div>
        <div className={styles.positionAnchor}>

          <div className={styles.downAvatarContainer}>
            <img className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          </div>

          <textarea
            className={bodyClassName}
            onChange={(event) => setTextInput(event.target.value)}
            placeholder="推你的回覆"
            value={textInput}
          />

          <div className={styles.footer}>
            <span className={warningClassName}>字數不可超過 140 字</span>
            <span className={headsUpClassName}>內容不可空白</span>
            <div className={styles.btnContainer}>
              <Button title="回覆" size="small" isAction onClick={handlePostReply}></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}