import style from './SuggestUserItem.module.scss';
import { followUser, unFollowUser } from '../../../../api/tweet';
import { useState, useEffect } from 'react';
import Button from '../../../Button/Button';
import logo_gray from '../../../../assets/icons/logo_gray.png'
import { Link } from 'react-router-dom';
///////////
import { useDataChange } from '../../../../contexts/DataChangeContext';


function SuggestUserItem(props) {
    const name = props.name
		const account = props.account
		const userId = props.userId;
		const isFollowed = props.isFollowed
		const avatar = props.avatar
		const id = props.userId;

		const [isClicked, setIsClicked] = useState(isFollowed)

    //狀態連動，使用CONTEXT解決
    const { isDataChange, setIsDataChange } = useDataChange()

		

		const handleClick = async() => {
			try {
				if (isClicked === true) {
					const data = await unFollowUser(userId)
					if (data.status === 'success') {
						setIsClicked(false)
            setIsDataChange(!isDataChange)
						console.log(isDataChange);
						
					}
				}
				if (isClicked === false) {
					const data = await followUser(userId)
					if (data.status === "success") {
            setIsClicked(true);
            setIsDataChange(!isDataChange);
            console.log(isDataChange);
          }
				}
				return
			} catch (error) {
				console.error('[Click FollowBtn Failed]', error)
			}
		}

    useEffect(() => {
      setIsClicked(isFollowed);
      console.log("isFollowed", isDataChange);
    }, [isFollowed, isDataChange]);

		

    return (
      <div className={style.suggestUserItem} id={id}>
        <Link to={`/user/${id}/tweet`}>
          <div className={style.userWrapper}>
            <div className={style.userAvatar}>
              <img
                className={style.avatar}
                src={avatar || logo_gray}
                alt='avatar'
              />
            </div>
            <div className={style.userInfo}>
              <span className={style.userName}> {name} </span>
              <span className={style.userAccount}> @{account} </span>
            </div>
          </div>
        </Link>

        <div className={style.followButton}>
          {isClicked ? (
            <Button
              className={style.following}
              title='正在跟隨'
              size='large'
              isActive
              onClick={handleClick}
            />
          ) : (
            <Button
              className={style.unfollow}
              title='跟隨'
              size='small'
              onClick={handleClick}
            />
          )}
        </div>
      </div>
    );
}

export default SuggestUserItem;