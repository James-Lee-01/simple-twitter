import style from './SuggestUser.module.scss';
import SuggestUserItem from './SuggestUserItem/SuggestUserItem';
import { getTopTenUsers } from '../../../api/tweet';
import { useEffect, useState } from 'react';

function SuggestUser() {
  const [ users, setUsers ] =useState([])

  useEffect( () => {
    const getTopTen = async () => {
      try {
        const data = await getTopTenUsers()
        if (data.status === 'error') {
          console.log(data.message)
          return
        }
        if (data) {
          setUsers(data)
          console.log('get', data)
        }
      } catch (error) {
        console.error('[getTopTen Failed]',error)
      }
    }
    getTopTen()
  }, [])

  
  const topUserList = users.map((user) => {
    return(
      <SuggestUserItem 
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
    <div className={style.suggestUser}>
        <h2>Popular</h2>
        {topUserList}
    </div>
    )
}

export default SuggestUser;