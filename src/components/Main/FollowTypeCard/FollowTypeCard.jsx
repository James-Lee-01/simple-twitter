import { useState, useEffect } from "react";
import style from "./FollowTypeCard.module.scss";
import { followUser, unFollowUser } from "../../../api/tweet";
import Button from "../../Button/Button";
import defaultAvatar from '../../../assets/icons/logo_gray.png'
import { Link } from "react-router-dom";

function FollowTypeCard (props) {
    const userId = props.userId;
    const name = props.name;
    const avatar = props.avatar;
    const introduction = props.introduction;
    const isFollowed = props.isFollowed;

    const [ isClicked, setIsClicked] = useState(isFollowed)

    useEffect(() => {
        setIsClicked(isFollowed);
    }, [isFollowed]);

    const handleClick = async () => {
        try {
            if (isClicked === true) {
                //Change to unfollow
                const data = await unFollowUser(userId)
                if (data.status === "success") {
                  setIsClicked(false);
                  console.log(isClicked);
                }
            }
            if (isClicked === false) {
                //Change to follow
                const data = await followUser(userId)
                if (data.status === "success") {
                  setIsClicked(true);
                  console.log(isClicked);
                }
            }
        } catch (error) {
            console.log('[Click Undone]', error)
        }
    }
    

    return (
      <div className={style.follow}>
        <Link to={`/user/${userId}/tweet`}>
          <div className={style.followAvatar}>
            <img
              className={style.avatar}
              src={avatar || defaultAvatar}
              alt='avatar'
            />
          </div>
        </Link>
        <div className={style.followInfo}>
          <div className={style.followWrap}>
            <div className={style.followUser}>
              <Link to={`/user/${userId}/tweet`}>
                <span className={style.followName}>{name}</span>
              </Link>
            </div>
            <div className={style.followTypeButton}>
              {isClicked ? (
                <Button
                  title='正在跟隨'
                  size='following'
                  isActive
                  onClick={handleClick}
                />
              ) : (
                <Button title='跟隨' size='follow' onClick={handleClick} />
              )}
            </div>
          </div>
          <div className={style.followContent}>
            <p>{introduction}</p>
          </div>
        </div>
      </div>
    );
}

export default FollowTypeCard;