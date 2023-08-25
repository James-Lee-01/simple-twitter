import axios from 'axios'

//baseUrl
const baseUrl = 'http://localhost:3004'

//api
//login
export const userLogin = async ({ account, password }) => {
  try {
    const { data } = await axios.get(`${baseUrl}/login`, {
      account,
      password,
    })

    //驗證角色身份
    const { authToken, role } = data 
    //若角色符合user
    if (authToken && role === 'user') {
      return { success: true, ...data }
    }
    //若角色為admin管理者
    if (authToken && role === 'admin') {
      //顯示錯誤訊息(暫時)
      console.error('帳號不存在')
    }
    return data
  } catch (error) {
    console.error(`[Get User failed]: `, error)
    return error
  }
}