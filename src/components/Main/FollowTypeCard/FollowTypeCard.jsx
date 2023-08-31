import { useState } from "react";
import style from "./FollowTypeCard.module.scss";
import { followUser, unFollowUser } from "../../../api/tweet";
import Button from "../../Button/Button";

function FollowTypeCard ({user}) {
    const userId = user.userId;
    const name = user.name
    const avatar = user.avatar
    const introduction = user.introduction
    const isFollowed = user.isFollowed

    const [ isClicked, setIsClicked] = useState(isFollowed)

    const handleClick = async () => {
        try {
            if (isClicked === true) {
                //Change to unfollow
                const data = await unFollowUser(userId)
                if (data.followingId) {
                    setIsClicked(false)
                }
            }
            if (isClicked === false) {
                //Change to follow
                const data = await followUser(userId)
                if (data.followId) {
                    setIsClicked(true)
                }
            }
        } catch (error) {
            console.log('[Click Undone]', error)
        }
    }
    

    return (
        <div className={style.follow}>
        <div className={style.followAvatar}>
            <div className={style.avatar}></div>
        </div>
        <div className={style.followInfo}>
            <div className={style.followWrap}>
                <div className={style.followUser}>
                    <span className={style.followName}>
                        { name }
                    </span>
                    
                </div>
                <div className={style.followTypeButton}>
                    { isFollowed ? 
                        <Button title='正在跟隨' size='following'/>
                        :
                        <Button title='跟隨' size='follow'/>
                    }
                </div>
            </div>
            <div class={style.followContent}>
                <p>
                    { introduction }
                </p>
            </div>
        </div>
        </div>
    )
}

export default FollowTypeCard;