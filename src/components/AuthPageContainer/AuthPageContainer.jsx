import styles from './AuthPageContainer.module.scss'
import logo from '../../assets/icons/logo.png'

export default function AuthPageContainer({ title, children }) {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="AC logo" />
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.authInputContainer}>
        {children}
      </div>
    </div>
  )
}