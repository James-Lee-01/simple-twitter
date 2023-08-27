import styles from "./AdminLoginPage.module.scss";
import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthPageContainer from "../../components/AuthPageContainer/AuthPageContainer.jsx";
import AuthInput from "../../components/AuthInput/AuthInput.jsx";
import Button from "../../components/Button/Button.jsx";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import Swal from "sweetalert2";

//{ labelName, type, value, placeholder, onChange, notification, lengthLimit }

export default function AdminLoginPage() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthContext();

  const [msg, setMsg] = useState('')

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
        toast: true,
        position: "top",
        title: "帳號及密碼不可空白",
        icon: "warning",
        timer: 1000,
        showConfirmButton: false,
      });
      setMsg("帳號及密碼不可空白");
      // console.log("Check user info");
      return;
    }
    // if(!isValid) {
    //   console.log('Check your user info')
    //   return
    // }
    const success = await login({ 
      account, 
      password,
      role: 'admin',
    });
    if (success) {
      Swal.fire({
        toast: true,
        position: "top",
        title: "登入成功",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
      // console.log("Login success");
      return;
    }
    //login failed
    Swal.fire({
      toast: true,
      position: "top",
      title: "帳號不存在!",
      icon: "error",
      timer: 1000,
      showConfirmButton: false,
    });
    setMsg("帳號不存在!");
    // console.log("LoginError");
  };

  // useEffect
  useEffect(() => {
    //確認後導向主頁面
    if (isAuthenticated) {
      navigate("/admin/tweet");
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthPageContainer title='後台登入'>
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
        labelName='密碼'
        type='password'
        value={password}
        placeholder='請輸入密碼'
        onChange={(passwordInput) => setPassword(passwordInput)}
        notification={msg}
        lengthLimit={50}
      />
      <Button size='extraLarge' title='登入' onClick={handleClick} />

      {/* switch link */}
      <div className={styles.linkContainer}>
        <Link to='/login'>
          <span className={styles.link}>前台登入</span>
        </Link>
      </div>
    </AuthPageContainer>
  );
}
