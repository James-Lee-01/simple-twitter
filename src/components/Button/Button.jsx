import styles from './Button.module.scss'
import clsx from 'clsx'

export default function Button({ size, onClick, title }) {
  //definition by size
  const buttonClassName = clsx(styles.button, {
    [styles.small]: size === "small",
    [styles.medium]: size === "medium",
    [styles.large]: size === "large",
    [styles.extraLarge]: size === "extraLarge",
    [styles.squareMedium]: size === "squareMedium",
    [styles.squareSmall]: size === "squareSmall",
  });

  return (
    <button className={buttonClassName} onClick={onClick}>{title}</button>
  )
}