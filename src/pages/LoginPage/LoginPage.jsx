import styles from './LoginPage.module.scss'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthPageContainer from '../../components/AuthPageContainer/AuthPageContainer.jsx'
import AuthInput from '../../components/AuthInput/AuthInput.jsx'
import Button from '../../components/Button/Button.jsx'
import { useAuthContext } from '../../contexts/AuthContext.jsx'
import Swal from 'sweetalert2'

//{ labelName, type, value, placeholder, onChange, notification, lengthLimit }

export default function LoginPage() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuthContext()

  //透過useMemo來保存驗證結果與確認
  // const isValid = useMemo(() => {
  //   if(!account) {
  //     return false
  //   }
  //   if(!password) {
  //     return false
  //   }
  //   return true
  // }, [account, password])

  //handleClick行為
  const handleClick = async () => {
    if (!account || !password) {
      Swal.fire({
        position: "top",
        title: "帳號及密碼不可空白",
        icon: "warning",
        timer: 1000,
        showConfirmButton: false,
      });

      console.log('Check user info')
      return
    }

    const success = await login({ account, password })
    if(success) {
      Swal.fire({
        position: "top",
        title: "登入成功",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
      // console.log('Login success')
      return
    }
    //login failed
    Swal.fire({
      position: "top",
      title: "帳號不存在!",
      icon: "error",
      timer: 1000,
      showConfirmButton: false,
    });
    // console.log('LoginError')
  }

  // useEffect
  useEffect(() => {
    //確認後導向主頁面
    if(isAuthenticated) {
      navigate('/main')
    }
  }, [isAuthenticated, navigate])

  return (
    <AuthPageContainer title='登入 Alphitter'>
      <AuthInput
        labelName='帳號'
        type='text'
        value={account}
        placeholder='請輸入帳號'
        onChange={(accountInput) => setAccount(accountInput)}
        notification='字數超出上限!'
        lengthLimit={50}
      />
      <AuthInput
        labelName='密碼'
        type='password'
        value={password}
        placeholder='請輸入密碼'
        onChange={(passwordInput) => setPassword(passwordInput)}
        notification='字數超出上限!'
        lengthLimit={50}
      />
      <Button size='extraLarge' title='登入' onClick={handleClick} />

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

