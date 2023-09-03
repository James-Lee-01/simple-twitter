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
    onClick:handleDelete,
  } = props;

  return (
    <div className={styles.itemContainer} key={tweetId}>
      <div className={styles.itemWrapper}>
        <div className={styles.itemDeleteBtn}>
          <button className={styles.itemDeleteBtn} onClick={() => handleDelete(tweetId)}>
          <img
            className={styles.itemDeleteIcon}
            src={admin_delete}
            alt='deleteIcon'
          />
          </button>
        </div>
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
  )
}