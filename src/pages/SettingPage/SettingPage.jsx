import styles from './SettingPage.module.scss'
import Header from '../../components/Header/Header.jsx'
import AuthInput from '../../components/AuthInput/AuthInput.jsx'
import Button from '../../components/Button/Button.jsx'
import Navbar from '../../components/Main/Navbar/Navbar.jsx'
import Swal from 'sweetalert2'
import { useState, useMemo, useEffect } from 'react'
import { getUser, setUserAccount } from '../../api/auth.js'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate, useLocation } from "react-router-dom";


export default function SettingPage() {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { currentUser, isAuthenticated, identified, role } = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  //取目前使用者的id
  const userId = currentUser && currentUser.id;

  //權限限制與重新導向
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  //先取得使用者自身資訊
  useEffect(() => {
    const getUserData = async () => {
      try {
        if (userId) {
          const data = await getUser(userId);
          if (data.status === "error") {
            console.log(data.message);
            return;
          }
          //若取得成功，先顯示在畫面上
          if (data) {
            await setAccount(data.account);
            await setName(data.name);
            await setEmail(data.email);
          }
        }
      } catch (error) {
        console.error("[Get Data Failed]", error);
      }
    };
    getUserData();
  }, [userId]);

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
      return;
    }

    //data API
    const data = await setUserAccount({
      account,
      name,
      email,
      password,
      checkPassword,
      userId,
    });

    //signup noti
    if (data.status === "success") {
      Swal.fire({
        toast: true,
        position: "top",
        title: "修改成功!",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    }

    //failed 後端驗證來的資訊
    Swal.fire({
      toast: true,
      position: "top",
      title: data.response.data.message,
      icon: "error",
      timer: 1000,
      showConfirmButton: false,
    });
    setMsg(data.response.data.message);
  };

  //prohibited, redirection
  useEffect(() => {
    if (identified) {
      if (role === "admin") {
        if (!isAuthenticated) {
          navigate("/admin/login");
        } else {
          navigate("/admin/tweet");
        }
      } else if (!isAuthenticated) {
        navigate("/login");
      }
    } else if (!isAuthenticated) {
      navigate("/login");
    }
  }, [pathname, navigate, isAuthenticated, identified, role]);

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