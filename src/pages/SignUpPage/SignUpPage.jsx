import styles from './SignUpPage.module.scss'
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthPageContainer from "../../components/AuthPageContainer/AuthPageContainer.jsx";
import AuthInput from "../../components/AuthInput/AuthInput.jsx";
import Button from "../../components/Button/Button.jsx";
import { userSignUp } from '../../api/auth';
import Swal from 'sweetalert2';


export default function SignUpPage() {
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const navigate = useNavigate()

  const [msg, setMsg] = useState('')

  //確認註冊規範是否符合
  const isValid = useMemo(() => {
    if (!account || account.length > 50) {
      return false
    }
    if (!name || name.length > 50) {
      return false
    }
    if (!email || !email.includes('@')) {
      return false
    }
    if (!password) {
      return false
    }
    if (!passwordCheck || passwordCheck !== password) {
      return false
    }

    return true
  }, [account, name, email, password, passwordCheck])

  const handleClick = async () => {
    if (!isValid) {
      Swal.fire({
        toast: true,
        position: "top",
        title: "請填入正確資料!",
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
      setMsg("請填入正確資料!");
      // console.log('Check your info again')
      return
    }

    //data
    const data = await userSignUp({
      account, name, email, password, passwordCheck
    })

    //signup noti
    if (data.status === "success") {
      Swal.fire({
        toast: true,
        position: "top",
        title: "註冊成功!請重新登入",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
      // console.log('success')
      
      //註冊成功則導回登入頁
      navigate('/login')
      return
    }

    //failed
    Swal.fire({
      toast: true,
      position: "top",
      title: data.response.data.message,
      icon: "error",
      timer: 1000,
      showConfirmButton: false,
    });
    setMsg(data.response.data.message)
    // console.log('signup failed')
  }

  return (
    <AuthPageContainer title='建立你的帳號'>
      <AuthInput
        labelName='帳號'
        type='text'
        value={account}
        placeholder='請輸入帳號'
        onChange={(accountInput) => setAccount(accountInput)}
        notification={msg}
        lengthLimit={50}
      />
      <AuthInput
        labelName='名稱'
        type='text'
        value={name}
        placeholder='請輸入使用者名稱'
        onChange={(nameInput) => setName(nameInput)}
        notification={msg}
        lengthLimit={50}
      />
      <AuthInput
        labelName='Email'
        type='text'
        value={email}
        placeholder='請輸入 Email'
        onChange={(emailInput) => setEmail(emailInput)}
        notification={msg}
        lengthLimit={50}
      />
      <AuthInput
        labelName='密碼'
        type='password'
        value={password}
        placeholder='請設定密碼'
        onChange={(passwordInput) => setPassword(passwordInput)}
        notification={msg}
        lengthLimit={50}
      />
      <AuthInput
        labelName='密碼確認'
        type='password'
        value={passwordCheck}
        placeholder='請再次輸入密碼'
        onChange={(passwordCheckInput) => setPasswordCheck(passwordCheckInput)}
        notification={msg}
        lengthLimit={50}
      />
      <Button size='extraLarge' title='註冊' onClick={handleClick} />

      {/* switch link */}
      <div className={styles.linkContainer}>
        <Link to='/login'>
          <span className={styles.link}>取消</span>
        </Link>
      </div>
    </AuthPageContainer>
  );
}