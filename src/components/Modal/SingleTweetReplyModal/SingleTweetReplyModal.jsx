import { useState, useEffect } from 'react';
import { Toast } from '../../../api/tweet.js';
import { getRelativeTime } from '../../../api/tweet.js';
import { useAuthContext } from "../../../contexts/AuthContext.jsx";
import { useDataStatus } from '../../../contexts/DataContext.jsx';
import { getUser } from "../../../api/auth";
import { useDataChange } from "../../../contexts/DataChangeContext";
import clsx from 'clsx';
import usePostReply from '../../../hooks/usePostReply.js';
import Button from '../../Button/Button.jsx';

import Modal from '../Modal'
import styles from './SingleTweetReplyModal.module.scss';

export default function SingleTweetReplyModal({ handleCloseModal, props }) {
  const [userProfile, setUserProfile] = useState("");
  //需對照使用者身份
  const [replyText, setReplyText] = useState('');
  const { currentUser } = useAuthContext();
  const userId = currentUser && currentUser.id;
  const { isDataUpdate, setIsDataUpdate } = useDataStatus();
  const [show, setShow] = useState(true);
  const { isUpdating, replyPostHook } = usePostReply();

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

  /////////////
  const { isDataChange, setIsDataChange } = useDataChange()
  useEffect(() => {
    // console.log('1',currentUser);
    const getUserInfo = async () => {
      try {
        if (userId) {
          const data = await getUser(userId);
          if (data.status === "error") {
            console.log(data.message);
            return;
          }
          if (data) {
            // update data
            await setUserProfile(data);
            console.log(data);
          }
        }
      } catch (error) {
        console.log("getUser Failed", error);
      }
    };
    getUserInfo();
  }, [userId, isDataChange]);
  /////////////


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
      setTimeout(() => {
        handleCloseModal();
        return;
      }, 1500);

    }
    await replyPostHook(replyText, tweetId);
    await setReplyText(''); //清空
    setIsDataUpdate(!isDataUpdate);
    setShow(false);
    handleCloseModal();
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
              className={styles.avatar}
              src={userProfile.avatar}
              alt="UserAvatar" />
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