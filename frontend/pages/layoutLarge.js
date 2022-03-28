import styles from "../static/styles/layout/layout.module.scss";
import TopNav from "../components/navigation/topNav";

export default function LayoutLarge({ children }) {
  return (
    <section className={styles.container_large}>

      <div className={styles.container__top_nav}><TopNav /></div>

      <main className={styles.container__main}>{ children }</main>

    </section>
  )
}