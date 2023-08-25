import styles from './AuthPageContainer.module.scss'

export default function AuthPageContainer({ title, children }) {
  return (
    <div className={styles.container}>
      {/* logo */}
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.authInputContainer}>
        {children}
      </div>
    </div>
  )
}