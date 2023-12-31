import axios from 'axios'
//baseUrl
const baseUrl = '/api';


//////////axiosInstance/////////////
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);
//////////////////////////////////

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
    const role = data.role
    const authToken = data.token

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
    const role = data.role
    const authToken = data.token
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
export const userSignUp = async ({ account, name, email, password, checkPassword }) => {
  try {
    const { data } = await axios.post(`${baseUrl}/users`, {
      account,
      name,
      email,
      password,
      checkPassword,
    })
    return data
  } catch (error) {
    console.error('[SignUp Failed]', error)
    return error
  }
}


//Setting user account
export const setUserAccount = async ({ account, name, email, password, checkPassword, userId }) => {
  try {
    const { data } = await axiosInstance.put(`/users/${userId}/account`, {
      account,
      name,
      email,
      password,
      checkPassword,
    })
    return data
  } catch (error) {
    console.error('[Set account Failed]', error)
    console.log(error.message)
    return error
  }
}

//Get User Info Data
export const getUser = async (userId) => {
  try {
    const { data } = await axiosInstance.get(`/users/${userId}`)
    if (data)
    return data
  } catch (error) {
    console.error('[Get user info Failed], error')
    return error
  }
}


//Admin Get Users
export const getAdminUsers = async () => {
  try {
    const { data } = await axiosInstance.get(`/admin/users`)
    console.log('getAdminUsers', data)
    return data
  } catch (error) {
    console.error('[getAdminUsers Failed], error')
    return
  }
}