import { useState } from 'react';
import { setUserProfile } from '../api/tweet'

//data to server
//using FormData
export default function useUpdateChange () {
  const [isUpdating, setIsUpdating] = useState(false)

  const updateUserInfo = async (user) => {
    try {
      if (isUpdating) return
      setIsUpdating (true)

      ///FormData.append(key, value)
      const formData = new FormData();
            formData.append("cover", user.updateCoverPhoto); //new cover photo
            formData.append("avatar", user.updateAvatar); //new avatar
            formData.append("name", user.name); //new name
            formData.append("introduction", user.introduction); //new introduction
      
      //API
      const data = await setUserProfile (formData, user.id)
      
      if (data==="error") {
            console.log('修改個人資料失敗:',data.res.data.message)         
          return
      }
      
      console.log(data.message)
      console.log('check',data) //easy for checking response
      setIsUpdating(false)

    } catch (error) {
    console.error(error)
    setIsUpdating(false)
    }
  } 
  return {
    isUpdating,
    updateUserInfo
  } 
}