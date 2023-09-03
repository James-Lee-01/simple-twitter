import styles from './TextAreaInput.module.scss'
import clsx from "clsx";

export default function AuthInput({
  labelName,
  type,
  value,
  placeholder,
  onChange,
  notification,
  lengthLimit,
}) {
  // use clsx to switch className
  // situation normal, over limit or >0
  const textareaClassName = clsx(
    styles.textarea,
    { [styles.active]: notification },
    { [styles.active]: value.length > lengthLimit }
  );

  const notiClassName = clsx(
    styles.notification,
    {
      [styles.activeText]: value.length > lengthLimit,
    },
    {
      [styles.active]: notification,
    }
  );

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
        <label className={styles.label}>{labelName}</label>
        <textarea
          className={textareaClassName}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange?.(event.target.value)}
        />
      </div>
      <div className={styles.noteContainer}>
        <div className={notiClassName}>{notification}</div>
        <span className={lengthClassName}>
          {value.length}/{lengthLimit}
        </span>
      </div>
    </>
  );
}
