import styles from './AdminTweetItem.module.scss'
import admin_delete from '../../assets/icons/admin/admin_delete.png'
import logo_gray from '../../assets/icons/logo_gray.png'
import { getRelativeTime } from '../../api/tweet';

export default function AdminTweetItem (props) {
  const {
    tweetId,
    avatar,
    name,
    account,
    createdAt,
    description,
    // onClick: handleDelete,
  } = props;

  // const deleteTweet = async () => {
  //   try {
  //     // 呼叫刪除API
  //     // 例如：await deleteTweetAPI(tweetId);
  //     console.log(`刪除推文 ${tweetId}`);
      
  //     if (handleDelete) {
  //       handleDelete(tweetId);
  //     }
  //   } catch (error) {
  //     console.error("刪除推文失敗", error);
  //   }
  // };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemWrapper}>
        <button className={styles.itemDeleteBtn}>
          {/* <button className={styles.itemDeleteBtn} onClick={deleteTweet}> */}
          <img
            className={styles.itemDeleteIcon}
            src={admin_delete}
            alt='deleteIcon'
          />
        </button>
        <div>
          <img
            className={styles.itemAvatar}
            src={avatar || logo_gray}
            alt='avatar'
          />
        </div>
        <div className={styles.itemInfoWrapper}>
          <div className={styles.itemInfoUser}>
            <div className={styles.itemInfoUserName}>{name}</div>
            <div className={styles.itemInfoTag}>
              @{account}・{ getRelativeTime(createdAt) }
            </div>
          </div>
          <div className={styles.itemInfoTextWrapper}>
            <p className={styles.itemInfoText}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}