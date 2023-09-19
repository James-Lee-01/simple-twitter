import style from './OnlineUser.module.scss';
import OnlineUserItem from './OnlineUserItem/OnlineUserItem';
import { getTopTenUsers } from '../../../api/tweet';
import { useEffect, useState } from 'react';
import { useDataChange } from '../../../contexts/DataChangeContext';

function OnlineUser() {
  const [users, setUsers] = useState([])

  const { isDataChange } = useDataChange()

  useEffect(() => {
    const getTopTen = async () => {
      try {
        const data = await getTopTenUsers();
        if (data.status === "error") {
          console.log(data.message);
          return;
        }
        if (data) {
          setUsers(data);
          // console.log('get', data)
        }
      } catch (error) {
        console.error("[getTopTen Failed]", error);
      }
    };
    getTopTen();
  }, [isDataChange]);


  const onlineUserList = users.map((user) => {
    return (
      <OnlineUserItem
        key={user.id}
        name={user.name}
        account={user.account}
        avatar={user.avatar}
        isFollowed={user.isFollowed}
        userId={user.id}
      />
    )
  })

  return (
    <div className={style.onlineUser}>
      {onlineUserList}
    </div>
  )
}

export default OnlineUser;