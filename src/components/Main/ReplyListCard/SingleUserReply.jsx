import styles from "./ReplyListCard.module.scss";
import { Link } from "react-router-dom";
import logo_gray from "../../../assets/icons/logo_gray.png";
import { getRelativeTime } from "../../../api/tweet";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../../api/auth";

export default function SingleUserReply(props) {
  const [userProfile, setUserProfile] = useState("");
  const URL = useParams();
  const userId = userProfile.id;
  const userName = userProfile.userName;
  const account = userProfile.account;
  const avatar = userProfile.avatar;
  ///////////////////////////
  // const avatar = props.avatar;
  // const account = props.account;
  // const userName = props.name;
  const createdAt = props.createdAt;
  const tweetAccount = props.tweetAccount;
  // const userId = props.userId;
  const comment = props.comment;

  //////////////////////////

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (URL.userId) {
          const data = await getUser(URL.userId);
          if (data.status === "error") {
            console.log(data.message);
            return;
          }
          if (data) {
            // update data
            await setUserProfile(data);
          }
        }
      } catch (error) {
        console.log("getUser Failed", error);
      }
    };
    getUserInfo();
  }, [URL.userId]);

  ///////////////////////////////////////////

  return (
    <div className={styles.modalContainer}>
      <div className={styles.left}>
        <Link to={`/user/${userId}/tweet`}>
          <div className={styles.avatarContainer}>
            <img
              className={styles.tweetAvatar}
              src={avatar || logo_gray}
              alt='avatar'
            />
          </div>
        </Link>
      </div>
      <div className={styles.right}>
        <Link to={`/user/${userId}/tweet`}>
          <div className={styles.tweetUserInfo}>
            <span className={styles.tweetUserName}>{userName}</span>
            <span className={styles.tweetUserAccount}>
              @{account}・{getRelativeTime(createdAt)}
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
