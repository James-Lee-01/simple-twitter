import styles from './Button.module.scss'
import clsx from 'clsx'

export default function Button({ size, onClick, title, isActive }) {
  //definition by size
  const buttonClassName = clsx(styles.button, {
    [styles.small]: size === "small",
    [styles.medium]: size === "medium",
    [styles.large]: size === "large",
    [styles.extraLarge]: size === "extraLarge",
    [styles.squareMedium]: size === "squareMedium",
    [styles.squareSmall]: size === "squareSmall",
    [styles.following]: size === "following",
    [styles.follow]: size === "follow",
    //加active代表轉橘色實心，除了extraLarge無效。
    [styles.active]: isActive,
  });

  return (
    <button className={buttonClassName} onClick={onClick}>{title}</button>
  )
}