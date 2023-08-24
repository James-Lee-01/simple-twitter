import styles from './Button.module.scss'
import clsx from 'clsx'

export default function Button({ size, onClick, title }) {
  //definition by size
  const buttonClassName = clsx(styles.button, {[styles.extraLarge]: size === 'extraLarge'})

  return (
    <button className={buttonClassName} onClick={onClick}>{title}</button>
  )
}