import styles from './ChatRoomPage.module.scss'
import SubmitBtn from '../../assets/icons/symbol/icon_send.png'

import Header from '../../components/Header/Header.jsx'
import OnlineUser from '../../components/Main/OnlineUser/OnlineUser';
import Navbar from '../../components/Main/Navbar/Navbar.jsx'
import Swal from 'sweetalert2'
import { useState, useMemo, useEffect } from 'react'
import { getUser, setUserAccount } from '../../api/auth.js'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate, useLocation } from "react-router-dom";



export default function ChatRoomPage() {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { currentUser, isAuthenticated } = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // //畫面跳轉限制
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [pathname, navigate, isAuthenticated]);

  //上線使用者


  //畫面渲染
  return (
    <div className={styles.container}>
      {/* <Header /> */}
      <div className={styles.timeline}>
        <Navbar title='上線使用者' />
        <div className={styles.onlineUserContainer}>{/* <OnlineUser /> */}</div>
      </div>
      <div className={styles.chatRoomContainer}>
        <div className={styles.chatRoomNavBar}>
          {/* <p className={styles.navBarTitle}>公開聊天室</p> */}
          <Navbar title='公開聊天室' />
        </div>
        <div className={styles.chatWrapper}>
          <div className={styles.chatContent}>
            <p className={styles.onlineNotify}>John Doe 上線</p>
            <p className={styles.otherMsg}>test</p>
            <p className={styles.userMsg}>test by John Doe</p>
            <p className={styles.offlineNotify}>John Doe 離線</p>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type='text'
              className={styles.input}
              placeholder='輸入訊息...'
            />
            <img src={SubmitBtn} alt='submit' className={styles.submit} />
          </div>
        </div>
      </div>
    </div>
  );
}