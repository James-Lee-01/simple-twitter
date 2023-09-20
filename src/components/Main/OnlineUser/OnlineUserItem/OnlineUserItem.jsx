import style from './OnlineUserItem.module.scss';
import { useState, useEffect } from 'react';
import logo_gray from '../../../../assets/icons/logo_gray.png'
import { Link } from 'react-router-dom';
///////////
import { useDataChange } from '../../../../contexts/DataChangeContext';


function OnlineUserItem(props) {
  const name = props.name
  const account = props.account
  // const userId = props.userId;
  const isFollowed = props.isFollowed
  const avatar = props.avatar
  const id = props.userId;

  //狀態連動，使用CONTEXT解決
  const { isDataChange, setIsDataChange } = useDataChange()

  return (
    <div className={style.onlineUserItem} id={id}>
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

    </div>
  );
}

export default OnlineUserItem;