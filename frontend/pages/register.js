import Layout from "./layout";
import styles from "../static/styles/login.module.scss";
import ImageUploadButton from "../components/imageUploadButton";
import DefaultButton from "../components/defaultButton";

export default function LoginPage(){
  return (
    <Layout>
      <section className={styles.form_container}>
        <div className={styles.form_container__title_box}>
          <p className={styles.form_container__title_box__title}>Login</p>
        </div>

        <form className={styles.form_container__form} method="POST" action="">
          <div className={styles.form_container__form__input_box}>
            <input type="text" placeholder="Full name" name="fullName" />
          </div>

          <div className={styles.form_container__form__input_box}>
            <input type="text" placeholder="Username" name="username" />
          </div>

          <div className={styles.form_container__form__input_box}>
            <input type="email" placeholder="Email" name="email" />
          </div>

          <div className={styles.form_container__form__input_box}>
            <input type="password" placeholder="Password" name="password" />
          </div>
          
          <div className={styles.form_container__form__input_box}>
            <ImageUploadButton 
              content="Profile Image" 
              maxFileSize="5" 
              minWidth="600"
              maxWidth="800"
              minHeight="600"
              maxHeight="800"
            />
          </div>

          <div className={styles.form_container__form__input_box}>
            <ImageUploadButton content="Banner Image" maxFileSize="5" />
          </div>

          <div className={styles.form_container__form__input_box}>
            <DefaultButton 
              text="Register"
              bg_color="transparent"
              br_color="#3ea6ff"
              f_color="#3ea6ff"
              br=".2rem"
              width="100%"
              type="submit"
            />
          </div>
        </form>
      </section>
    </Layout>
  )
}