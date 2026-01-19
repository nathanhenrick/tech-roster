import styles from "./Loader.module.scss"

export default function Loader() {
  return (
    <div data-testid="loader" className={styles.loader}></div>
  )
}