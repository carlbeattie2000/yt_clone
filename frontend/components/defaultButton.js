import styles from "../static/styles/components/buttons.module.scss";

export default function DefaultButton({ text, bg_color, f_color, br_color, width, height, br, onclick, type="button" }) {
  return (
    <button
      style={{backgroundColor: bg_color, color: f_color, borderColor: br_color, width, height, borderRadius: br}}
    className={styles.default_button} onClick={onclick} type={type}>{text}</button>
  )
}