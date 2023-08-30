import style from "./UserInfo.module.scss";
import { useState, useEffect } from "react";
import { getUser } from '../../../../api/auth'
import { useParams } from "react-router-dom";

function UserInfo() {
	const [userProfile, setUserProfile] = useState("");
  const URL = useParams();
  const name = userProfile?.name;
  const tweetNum = userProfile?.tweetCount;

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
            // console.log("userProfile", data);
          }
        }
      } catch (error) {
        console.log("getUser Failed", error);
      }
    };
    getUserInfo();
  }, [URL.userId]);


    return (
      <div className={style.userInfoContainer}>
        <div className={style.userName}>{name}</div>
        <div className={style.followCount}>{tweetNum} 推文</div>
      </div>
    );
}

export default UserInfo;