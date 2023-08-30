import style from "./CurrentUser.module.scss";
import Button from "../../Button/Button";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Link, useParams } from 'react-router-dom'
import { getUser } from "../../../api/auth.js";
import { followUser, unFollowUser } from "../../../api/tweet.js";
import logo_gray from '../../../assets/icons/logo_gray.png'
import mail from '../../../assets/icons/user/user_msg.png'
import notify from '../../../assets/icons/user/user_notfi.png'


const CurrentUser = () => {
    const [userProfile, setUserProfile] = useState("");
    const URL = useParams();
    const userId = userProfile.id;
    const isFollowed = userProfile.isFollowed;
    const { currentUser } = useAuthContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(isFollowed);

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
              await setIsClicked(data.isFollowed);
            }
          }
        } catch (error) {
          console.log("getUser Failed", error);
        }
      };
      getUserInfo();
    }, [URL.userId]);

		const handleOpenModal = () => {
			//Modal開啟
      setIsModalOpen(true);
    };
    const handleCloseModal = () => {
			//Modal關閉
      setIsModalOpen(false);
    };

    const handleClick = async () => {
      try {
        if (isClicked === false) {
          const data = await followUser(userId);
          if (data.followingId) {
            await setIsClicked(true);
          }
        }
        if (isClicked === true) {
          const data = await unFollowUser(userId);
          if (data.followingId) {
            await setIsClicked(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };


    return (
      <div className={style.userWrapper}>
        <div className={style.coverPhoto}></div>
        <div className={style.userAvatar}>
          <img
            className={style.avatar}
            src={userProfile?.avatar || logo_gray}
            alt='UserAvatar'
          />
        </div>
        <div className={style.userInfo}>
          {userId === currentUser.id ? (
            <div className={style.editButton}>
              <Button
                title='編輯個人資料'
                size='large'
                onClick={handleOpenModal}
              />
            </div>
          ) : (
            <div className={style.btnWrapper}>
              <div className={style.mailImage}>
                <img src={mail} alt='msg' className={style.mailIcon} />
              </div>
              <div className={style.notifyImage}>
                <img src={notify} alt='notify' className={style.notifyIcon} />
              </div>
              <div onClick={handleClick}>
                <Button
                  title={isClicked ? "正在跟隨" : "跟隨"}
                  size={isClicked ? "following" : "follow"}
                  isActive={isClicked}
                />
              </div>
            </div>
          )}

          <span className={style.userName}>{userProfile.name}</span>
          <span className={style.userAccount}>@{userProfile.account}</span>
          <p>{userProfile.introduction}</p>
          <div className={style.followInfo}>
            <Link to={`/user/${userId}/following`} className={style.link}>
              <span>{userProfile.followingCount} 個</span>跟隨中
            </Link>
            <Link to={`/user/${userId}/follower`} className={style.link}>
              <span>{userProfile.followerCount} 位</span>跟隨者
            </Link>
          </div>
        </div>
      </div>
    );
}

export default CurrentUser;