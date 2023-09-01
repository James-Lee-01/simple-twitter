import { useState, useEffect } from 'react';
import { Toast } from '../../../api/reply.js';
import { getRelativeTime } from '../../../api/tweet.js';
import { useAuthContext } from "../../../contexts/AuthContext.jsx";
import { useDataStatus } from '../../../contexts/DataContext.jsx';
import clsx from 'clsx';
import usePostReply from '../../../hooks/usePostReply.js';
import Button from '../../Button/Button.jsx';

import CancelIcon from '../../../assets/icons/modal/modal_esc.png';
import Modal from '../Modal'
import styles from './SingleTweetReplyModal.module.scss';

export default function SingleTweetReplyModal({ handleCloseModal, props }) {
  const [replyText, setreplyText] = useState('');
  const { currentUser } = useAuthContext();
  const { isDataUpdate, setIsDataUpdate } = useDataStatus();
  const { isUpdating, replyPostHook } = usePostReply();
  const [avatarUrl, setAvatarUrl] = useState('');
  const [show, setShow] = useState(true);

  const warningClassName = clsx(styles.waring, { [styles.active]: replyText.length > 140 });
  const headsUpClassName = clsx(styles.headsUp, { [styles.active]: replyText.length === 0 });
  const bodyClassName = clsx(styles.body, { [styles.active]: replyText.length > 0 });

  const tweetId = props.id;
  const userName = props.User.name;
  const account = props.User.account;
  const avatar = props.User.avatar;
  const description = props.description;
  const createdAt = props.createdAt;

  useEffect(() => {
    const userId = props.User.id;
    fetch(`/api/user/${userId}/avatar`)
      .then(response => response.json())
      .then(data => {
        setAvatarUrl(data.avatarUrl);
      })
      .catch(error => {
        console.error('Error fetching avatar URL:', error);
      });
  }, [props.User.id]);

  const handlePostReply = async () => {
    if (replyText.trim().length === 0) {
      setreplyText('');
      Toast.fire({
        title: '內容不可空白',
        icon: 'error',
      });
      return;

    }
    if (replyText.length > 140) return;

    await replyPostHook(replyText, tweetId);
    await setreplyText('');
    await setIsDataUpdate(!isDataUpdate);
    await setShow(false);
    await handleCloseModal();
  };


  const handleCloseBtn = (e) => {
    if (!isUpdating) {
      if (e.target.classList.contains(styles.modalOverlay)) {
        setShow(false);
        handleCloseModal();
      }
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={handleCloseBtn}>
      <Modal
        onClose={handleCloseModal}
        show={show}

      >
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
            onChange={(event) => setreplyText(event.target.value)}
            placeholder="推你的回覆"
            value={replyText}
          />

          <div className={styles.footer}>
            <span className={warningClassName}>字數不可超過 140 字</span>
            <span className={headsUpClassName}>內容不可空白</span>
            <div className={styles.btnContainer}>
              <Button
                title="回覆"
                size="small"
                isAction
                onClick={handlePostReply}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}