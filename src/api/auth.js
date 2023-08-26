import axios from 'axios'
//baseUrl
const baseUrl = 'https://young-waters-15158-8b230f0b0919.herokuapp.com/api'

//api
//login(user only)
export const userLogin = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${baseUrl}/login`, {
      account,
      password,
    })

    //驗證角色身份
    // const { authToken, role } = data
    const status = data.status
    const role = data.data.user.role
    const authToken = data.data.token

    //若角色符合user
    if (status === 'success'  && role === 'user') {
      // console.log(status)
      // console.log(authToken)
      return { success: true, authToken }
    }
    //若角色為admin管理者
    if (status === 'success' && role === 'admin') {
      //顯示錯誤訊息(暫時)
      console.error('帳號不存在')
    }

    // console.log(data)
    return 
  } catch (error) {
    console.error(`[Get User failed]: `, error)
    return error
  }
}

//login(admin only)
export const adminLogin = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${baseUrl}/admin/login`, {
      account,
      password,
    })

    //驗證角色身份
    // const { authToken, role } = data
    const status = data.status
    const role = data.data.user.role
    const authToken = data.data.token
    //若角色為admin管理者
    if (status === 'success' && role === 'admin') {
      return { success: true, authToken }
    }
    //若角色符合user
    if (status === 'success' && role === 'user') {
      //顯示錯誤訊息(暫時)
      console.error('帳號不存在')
    }
    return
  } catch (error) {
    console.error(`[Get Admin User failed]: `, error)
    return error
  }
}

//signup(user)
export const userSignUp = async ({ account, name, email, password, passwordCheck }) => {
  try {
    const { data } = await axios.post(`${baseUrl}/users`, {
      account,
      name,
      email,
      password,
      passwordCheck,
    })
    return data
  } catch (error) {
    console.error('[SignUp Failed]', error)
    return error
  }
}