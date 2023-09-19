import styles from './ChatRoomPage.module.scss'
import Header from '../../components/Header/Header.jsx'
import OnlineUser from '../../components/Main/OnlineUser/OnlineUser';
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
  const { currentUser, isAuthenticated } = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  //畫面跳轉限制
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [pathname, navigate, isAuthenticated]);

  //上線使用者


  //畫面渲染
  return (
    <div className={styles.chatRoomContainer}>
      <Header />
      <div className={styles.timeline}>
        <Navbar title='上線使用者' />
        <div className={styles.onlineUserContainer}>
          <OnlineUser />
        </div>
      </div>
    </div>
  );
}