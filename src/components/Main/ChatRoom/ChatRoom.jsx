import styles from "./ChatRoom.module.scss";
import SubmitBtn from "../../../assets/icons/symbol/icon_send.png";
import avatar from "../../../assets/icons/logo_gray.png";
import Navbar from "../Navbar/Navbar";

export default function ChatRoom() {
  return (
    <div className={styles.chatRoomContainer}>
      <div className={styles.chatRoomNavBar}>
        <Navbar title='公開聊天室' />
      </div>
      <div className={styles.chatWrapper}>
        <div className={styles.chatContent}>
          <div className={`${styles.chatCard} ${styles.notify}`}>
            <div className={styles.onlineNotify}>
              <p>John Doe 上線</p>
            </div>
          </div>
          <div className={`${styles.chatCard} ${styles.other}`}>
            <div className={styles.otherMsg}>
              <img src={avatar} alt='avatar' />
              <p>test by John Doe</p>
            </div>
          </div>
          <div className={`${styles.chatCard} ${styles.user}`}>
            <div className={styles.userMsg}>
              <p>test</p>
            </div>
          </div>
          <div className={`${styles.chatCard} ${styles.notify}`}>
            <div className={styles.offlineNotify}>
              <p>John Doe 離線</p>
            </div>
          </div>
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
  );
}
