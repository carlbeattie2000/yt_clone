import Layout from "./layout";
import styles from "../static/styles/login.module.scss";
import ImageUploadButton from "../components/imageUploadButton";
import DefaultButton from "../components/defaultButton";

export default function LoginPage(){
  const handleRegisterPost = async (e) => {
    e.preventDefault();

    const form = new FormData();
    const formPostingData = e.target.elements;

    form.append("fullName", formPostingData["fullName"].value);
    form.append("username", formPostingData["username"].value);
    form.append("email", formPostingData["email"].value);
    form.append("password", formPostingData["password"].value);
    form.append("profileImage", formPostingData["profileImage"].files[0]);

    await fetch("http://localhost:4001/register", {
      method: "POST",
      body: form
    })
  }

  return (
    <Layout>
      <section className={styles.form_container}>
        <div className={styles.form_container__title_box}>
          <p className={styles.form_container__title_box__title}>Register</p>
        </div>

        <form className={styles.form_container__form} onSubmit={(e) => handleRegisterPost(e)}>
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
              name="profileImage" 
              maxFileSize="6" 
              minWidth="600"
              maxWidth="800"
              minHeight="600"
              maxHeight="800"
            />
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