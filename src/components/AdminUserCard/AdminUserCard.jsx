import styles from './AdminUserCard.module.scss'
import defaultAdminBG from "../../assets/images/defaultAdminBG.png";
import admin_reply from "../../assets/icons/admin/admin_reply.png";
import admin_like from "../../assets/icons/admin/admin_like.png";
import logo_gray from "../../assets/icons/logo_gray.png";
// import backIcon from "../../../assets//icons/arrow.png";

export default function AdminUserCard(props) {
const coverPhoto = props.coverPhoto
const avatar = props.avatar
const name = props.name
const account = props.account
const tweetCount = props.tweetCount
const likeCount = props.likeCount
const followingNum = props.followingNum
const followerNum = props.followerNum

  return (
    <div className={styles.mainContainer}>
      <div className={styles.photoContainer}>
        <img className={styles.coverPhoto} src={ coverPhoto || defaultAdminBG } alt='Cover BG' />
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={ avatar || logo_gray } alt='Avatar' />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.name}>{ name }</div>
        <div className={styles.account}>@{ account }</div>

        <div className={styles.iconContainer}>
          <img className={styles.icon} src={ admin_reply } alt='reply' />
          <div className={styles.count}>
            { tweetCount || 0 }
            </div>
          <img className={styles.icon} src={ admin_like } alt='like' />
          <div className={styles.count}>
            { likeCount || 0 }
            </div>
        </div>

        <div className={styles.followContainer}>
          <div className={styles.followNum}>
            { followingNum || 0 }
            </div>
          <div className={styles.followType}>跟隨中</div>
          <div className={styles.followNum}>
            { followerNum || 0 }
            </div>
          <div className={styles.followType}>跟隨者</div>
        </div>
      </div>
    </div>
  );
}