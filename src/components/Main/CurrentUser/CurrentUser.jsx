import style from "./CurrentUser.module.scss";
import Button from "../../Button/Button";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Link, useParams } from 'react-router-dom'
import { getUser } from "../../../api/auth.js";
import { followUser, unFollowUser } from "../../../api/tweet.js";

const CurrentUser = () => {
    const [userProfile, setUserProfile] = useState("");
    const URL = useParams();
    const userId = userProfile?.id;
    const isFollowed = userProfile?.isFollowed;
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
              console.log("userProfile", data);
            }
          }
        } catch (error) {
          console.log("getUser Failed", error);
        }
      };
      getUserInfo();
    }, [URL.userId]);
		console.log('3',userProfile)

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
          <div className={style.avatar}></div>
        </div>
        <div className={style.userInfo}>
          <div className={style.editButton}>
            <Button title='編輯個人資料' size='large' />
          </div>

          <span className={style.userName}>{userProfile.name}</span>
          <span className={style.userAccount}>@{userProfile.account}</span>
          <p>
            {userProfile.description}
            {/* Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint.{" "} */}
          </p>
          <div className={style.followInfo}>
            <span>{userProfile.following} 個</span>跟隨中 (API無資料)
            <span>{userProfile.follower} 位</span>跟隨者(API無資料)
          </div>
        </div>
      </div>
    );
}

export default CurrentUser;