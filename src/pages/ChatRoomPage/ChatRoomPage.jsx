import styles from './ChatRoomPage.module.scss'
import SubmitBtn from '../../assets/icons/symbol/icon_send.png'


export default function ChatRoomPage() {

  return (
    <div className={styles.chatRoomContainer}>
      <div className={styles.chatRoomNavBar}>
        <p className={styles.navBarTitle}>公開聊天室</p>
      </div>
      <div className={styles.chatWrapper}>
        <div className={styles.chatContent}>
          <p>test</p>
        </div>
        <div className={styles.inputWrapper}>
          <input type='text' className={styles.input} placeholder='輸入訊息...' />
          <img src={SubmitBtn} alt='submit' className={styles.submit} />
        </div>
      </div>
    </div>
  );
}