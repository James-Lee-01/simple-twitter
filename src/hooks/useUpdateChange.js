import { useState } from 'react';
import { setUserProfile } from '../api/tweet'

export default function useUpdateChange () {
  const [isUpdating, setIsUpdating] = useState(false)

  const updateUserInfo = async (user) => {
    try {
      if (isUpdating) return

      setIsUpdating (true)

      const formData = new FormData();
            formData.append("coverPhoto", user.upCoverPhoto);
            formData.append("avatar", user.upAvatar);
            formData.append("name", user.name);
            formData.append("introduction", user.introduction);
      const data = await setUserProfile (formData, user.id)
      
      if (data.status==="error") {
            console.log('修改個人資料失敗')         
          return
      }
      
      console.log("修改個人資料成功",)
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