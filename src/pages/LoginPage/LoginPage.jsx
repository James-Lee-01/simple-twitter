import styles from './LoginPage.module.scss'
import { useState } from 'react'
import AuthInput from '../../components/AuthInput/AuthInput.jsx'

//{ labelName, type, value, placeholder, onChange, notification, lengthLimit }

function LoginPage() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
    <AuthInput
      labelName='帳號'
      type='text'
      value={account}
      placeholder='請輸入帳號'
      onChange={(accountInput) => setAccount(accountInput)}
      notification='字數超出上限'
      lengthLimit={50}
    />
    <AuthInput
      labelName='密碼'
      type='password'
      value={password}
      placeholder='請輸入密碼'
      onChange={(passwordInput) => setPassword(passwordInput)}
      notification='字數超出上限'
      lengthLimit={5}
    />
    </>
  )
}

export default LoginPage