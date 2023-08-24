import styles from './LoginPage.module.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthPageContainer from '../../components/AuthPageContainer/AuthPageContainer.jsx'
import AuthInput from '../../components/AuthInput/AuthInput.jsx'
import Button from '../../components/Button/Button.jsx'

//{ labelName, type, value, placeholder, onChange, notification, lengthLimit }

function LoginPage() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  return (
    <AuthPageContainer title='登入 Alphitter'>
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
      <Button size='extraLarge' title='登入' />

      {/* switch link */}
      <div className={styles.linkContainer}>
        <Link to='/signup'>
          <span className={styles.link}>註冊</span>
        </Link>
        <span>・</span>
        <Link to='/admin/login'>
          <span className={styles.link}>後台登入</span>
        </Link>
      </div>
    </AuthPageContainer>
  );
}

export default LoginPage