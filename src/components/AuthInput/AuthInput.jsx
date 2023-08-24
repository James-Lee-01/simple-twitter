import styles from './AuthInput.module.scss'
import clsx from 'clsx'

export default function AuthInput ({ labelName, type, value, placeholder, onChange, notification, lengthLimit }) {
  // use clsx to switch className
  // situation normal, over limit or >0
  const inputClassName = clsx(styles.input, {[styles.active]:value.length > lengthLimit})

  const notiClassName = clsx(styles.notification, {
    [styles.active]: value.length > lengthLimit,
  })

  const lengthClassName = clsx(
    styles.length,
    { [styles.active]: value.length > 0 },
    {
      [styles.limit]: value.length > lengthLimit,
    }
  );

  return (
    <>
      <div className={styles.container}>
        {/* label */}
        <label className={styles.label}>{labelName}</label>
        {/* input text */}
        <input 
          className={inputClassName}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange?.(event.target.value)}
        />
      </div>
      {/* notification bar and text limit */}
      <div className={styles.noteContainer}>
        <div className={notiClassName}>
          {notification}
        </div>
        <span className={lengthClassName}>
          {value.length}/{lengthLimit}
          </span>
      </div>
    </>
  )
}