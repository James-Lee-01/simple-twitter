import { useState, useEffect } from 'react';
import { Toast } from '../../../api/tweet.js';
import { getRelativeTime } from '../../../api/tweet.js';
import { useAuthContext } from "../../../contexts/AuthContext.jsx";
import { useDataStatus } from '../../../contexts/DataContext.jsx';
// import { apiFunction } from '../../../api/tweet.js';
import clsx from 'clsx';
import usePostReply from '../../../hooks/usePostReply.js';
import Button from '../../Button/Button.jsx';

import CancelIcon from '../../../assets/icons/modal/modal_esc.png';
import Modal from '../Modal'
import styles from './SingleTweetReplyModal.module.scss';
import { Form } from 'react-router-dom';

export default function SingleTweetReplyModal({ handleCloseModal, props, onChange }) {
  const [replyText, setReplyText] = useState('');
  const { currentUser } = useAuthContext();
  const { isDataUpdate, setIsDataUpdate } = useDataStatus();
  const [show, setShow] = useState(true);
  const { isUpdating, replyPostHook } = usePostReply();
  const [avatarUrl, setAvatarUrl] = useState('');

  const [newRerender, setNewRerender] = useState(false);
  const [msg, setMsg] = useState('');

  const headsUpClassName = clsx(styles.headsUp, { [styles.active]: replyText.length === 0 });
  const bodyClassName = clsx(styles.body, { [styles.active]: replyText.length > 0 });

  const tweetId = props.id;
  const userName = props.User.name;
  const account = props.User.account;
  const avatar = props.User.avatar;
  const description = props.description;
  const createdAt = props.createdAt;
  const limitClassName = clsx(styles.limit, { [styles.active]: msg });

  useEffect(() => {
    const userId = props.User.id;
    fetch(`/api/user/${userId}/avatar`) // 確保這個 URL 正確
      .then(response => response.json())
      .then(data => {
        if (data.avatarUrl) { // 確保有正確取得 avatarUrl
          setAvatarUrl(data.avatarUrl);
        } else {
          console.error('Avatar URL not found:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching avatar URL:', error);
      });
  }, [props.User.id]);

  const handlePostReply = async () => {
    if (replyText.trim().length === 0) {
      setReplyText('');
      Toast.fire({
        title: '內容不可空白',
        icon: 'error',
      });
      setMsg("內容不可空白");
      return;

    } else {
      handleCloseModal()
      setNewRerender(true);
    }

    await replyPostHook(replyText, tweetId);
    await setReplyText(''); //清空
    await setIsDataUpdate(!isDataUpdate);
    setShow(false);
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
      // className={styles.modalContainer}
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
            <img
            className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          </div>

          {/* <div className={styles.replyTextContainer}> */}
          <textarea
            className={bodyClassName}
            onChange={(event) => setReplyText(event.target.value)}
            placeholder="推你的回覆"
            value={replyText}
          />
          {/* </div> */}

          <div
            className={styles.footer}
          >
            {/* {replyText.trim().length === 0 && (
              <div className={headsUpClassName}>内容不可為空白</div>
            )} */}
            <div className={styles.replyButton}>
              <span className={headsUpClassName}>{msg}</span>
              <Button
                title="回覆"
                size="small"
                isActive
                onClick={handlePostReply}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}