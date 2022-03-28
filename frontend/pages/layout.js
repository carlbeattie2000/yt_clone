import styles from "../static/styles/layout/layout.module.scss";
import TopNav from "../components/navigation/topNav";

export default function Layout({ children }) {
  return (
    <section className={styles.container}>

      <div className={styles.container__top_nav}><TopNav /></div>

      <div className={styles.container__side_nav}></div>

      <main className={styles.container__main}>{ children }</main>

    </section>
  )
}