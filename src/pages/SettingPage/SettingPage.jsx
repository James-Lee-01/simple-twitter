import styles from './SettingPage.module.scss'
import Header from '../../components/Header/Header.jsx'
import AuthInput from '../../components/AuthInput/AuthInput.jsx'
import Button from '../../components/Button/Button.jsx'
import Navbar from '../../components/Main/Navbar/Navbar.jsx'
import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
///以下要修改處ＡＰＩ
import { userSignUp } from '../../api/auth.js'


export default function SettingPage() {
const [account, setAccount] = useState("");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [checkPassword, setCheckPassword] = useState("");
const navigate = useNavigate();

const [msg, setMsg] = useState("");

//確認註冊規範是否符合
const isValid = useMemo(() => {
  if (!account || account.length > 50) {
    return false;
  }
  if (!name || name.length > 50) {
    return false;
  }
  if (!email || !email.includes("@")) {
    return false;
  }
  if (!password) {
    return false;
  }
  if (!checkPassword) {
    return false;
  }

  return true;
}, [account, name, email, password, checkPassword]);

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
    // setMsg("請填入正確資料!");
    // console.log('Check your info again')
    return;
  }

  //data
  const data = await userSignUp({
    account,
    name,
    email,
    password,
    checkPassword,
  });

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
    navigate("/login");
    return;
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
  setMsg(data.response.data.message);
  // console.log('signup failed')
};

  //畫面渲染
  return (
    <div className={styles.settingContainer}>
      <Header />
      <div className={styles.timeline}>
        <Navbar title='帳戶設定' />
        <div className={styles.inputContainer}>
          <AuthInput
            labelName='帳號'
            type='text'
            value={account}
            placeholder='請輸入帳號'
            onChange={(accountInput) => setAccount(accountInput)}
            notification={msg === "account 已重複註冊！" ? msg : ""}
            lengthLimit={50}
          />
          <AuthInput
            labelName='名稱'
            type='text'
            value={name}
            placeholder='請輸入使用者名稱'
            onChange={(nameInput) => setName(nameInput)}
            notification=''
            lengthLimit={50}
          />
          <AuthInput
            labelName='Email'
            type='text'
            value={email}
            placeholder='請輸入 Email'
            onChange={(emailInput) => setEmail(emailInput)}
            notification={msg === "email 已重複註冊！" ? msg : ""}
            lengthLimit={50}
          />
          <AuthInput
            labelName='密碼'
            type='password'
            value={password}
            placeholder='請設定密碼'
            onChange={(passwordInput) => setPassword(passwordInput)}
            notification=''
            lengthLimit={50}
          />
          <AuthInput
            labelName='密碼確認'
            type='password'
            value={checkPassword}
            placeholder='請再次輸入密碼'
            onChange={(checkPasswordInput) =>
              setCheckPassword(checkPasswordInput)
            }
            notification={msg === "密碼不相符!" ? msg : ""}
            lengthLimit={50}
          />
          <div className={styles.btn}>
            <Button size='medium' title='儲存' isActive onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}