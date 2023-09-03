import styles from "./AdminLoginPage.module.scss";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import AuthPageContainer from "../../components/AuthPageContainer/AuthPageContainer.jsx";
import AuthInput from "../../components/AuthInput/AuthInput.jsx";
import Button from "../../components/Button/Button.jsx";
import Swal from "sweetalert2";


export default function AdminLoginPage() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthContext();
  const [msg, setMsg] = useState('')

  //handleClick行為
  const handleClick = async () => {
    if (!account || !password) {
      Swal.fire({
        toast: true,
        position: "top",
        title: "請填入正確資料",
        icon: "warning",
        timer: 1000,
        showConfirmButton: false,
      });
      setMsg("請填入正確資料");
      return;
    }

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
      return;
    }
    //login failed form server
    Swal.fire({
      toast: true,
      position: "top",
      title: "帳號不存在!",
      icon: "error",
      timer: 1000,
      showConfirmButton: false,
    });
    setMsg("帳號不存在!");
  };

  // prohibited and redirection
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
        notification={
          msg === "帳號不存在!" || msg === "請填入正確資料" ? msg : 0
        }
        lengthLimit={50}
      />
      <AuthInput
        labelName='密碼'
        type='password'
        value={password}
        placeholder='請輸入密碼'
        onChange={(passwordInput) => setPassword(passwordInput)}
        notification={msg === "請填入正確資料" ? msg : 0}
        lengthLimit={50}
      />
      <Button size='extraLarge' title='登入' onClick={handleClick} />

      <div className={styles.linkContainer}>
        <Link to='/login'>
          <span className={styles.link}>前台登入</span>
        </Link>
      </div>
    </AuthPageContainer>
  );
}
