import style from './SuggestUserItem.module.scss';
import { followUser, unFollowUser } from '../../../../api/tweet';
import { useState, useEffect } from 'react';
import Button from '../../../Button/Button';
import logo_gray from '../../../../assets/icons/logo_gray.png'


function SuggestUserItem({user}) {
    const name = user.name
		const account = user.account
		const userId = user.userId
		const isFollowed = user.isFollowed
		const avatar = user.avatar

		const [isClicked, setIsClicked] = useState(isFollowed)

		const handleClick = async() => {
			try {
				if (isClicked === true) {
					const data = await unFollowUser(userId)
					if (data.followId) {
						setIsClicked(false)
						console.log(data.followId)
					}
				}
				if (isClicked === false) {
					const data = await followUser(userId)
					if (data.followId) {
						setIsClicked(true)
						console.log(data.followId);
					}
				}
			} catch (error) {
				console.error('[Click FollowBtn Failed]', error)
			}
		}

		useEffect(() => {
			setIsClicked(isFollowed)
		}, [isFollowed])

    return (
      <div className={style.suggestUserItem}>
        <div className={style.userWrapper}>
          <div className={style.userAvatar}>

              <img
                className={style.avatar}
                src={avatar || logo_gray}
                alt='avatar'
              />

          </div>
          <div className={style.userInfo}>
            <span className={style.userName}> { name } </span>
            <span className={style.userAccount}> @{ account } </span>
          </div>
        </div>
        <div className={style.followButton} onClick={handleClick}>
          {isClicked ? (
            <Button className={style.following} title='正在跟隨' size='large' isActive/>
          ) : (
            <Button className={style.unfollow} title='跟隨' size='small'/>
          )}
        </div>
      </div>
    );
}

export default SuggestUserItem;