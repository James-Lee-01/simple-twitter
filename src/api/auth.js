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
    return data
  } catch (error) {
    console.error(`[Get User failed]: `, error)
    return error
  }
}