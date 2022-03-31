import styles from "../../static/styles/components/navigation/topNav.module.scss";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import DefaultButton from "../defaultButton";
import { useState } from "react";
import MainLogo from "../svg/mainLogo";

export default function TopNav() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHasInput, setSearchHasInput] = useState(false);

  return (
    <nav className={styles.top_nav}>
      <div className={styles.top_nav__logo}>
        <Link href="/">
          <a>
            <MainLogo bg_mode="light" />
          </a>
        </Link>
      </div>

      <div className={styles.top_nav__search_box}>
        <div className={styles.top_nav__search_box__search_bar}>
          <div className={styles.top_nav__search_box__search_bar__search_input}>
            <input type="search" placeholder="Search" value={searchQuery} onChange={(e) => {
              setSearchQuery(e.target.value);
              
              if (e.target.value.length > 0) {
                setSearchHasInput(true)
              } else {
                setSearchHasInput(false);
              }
            }} />

            {searchHasInput ? 
              <div className={
                styles.top_nav__search_box__search_bar__search_input__input_remove}>
                  <button onClick={() => {
                    setSearchQuery("");
                    setSearchHasInput(false);
                  }}>
                    <AiOutlineClose />
                  </button>
              </div> 
              : 
              ""}
          </div>

          <div className={styles.top_nav__search_box__search_bar__search_icon}>
            <Link href="/search">
              <a>
                <AiOutlineSearch />
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.top_nav__actions}>
        <div className={styles.top_nav__actions__desktop_button}>
          <DefaultButton 
            text="Sign in" 
            bg_color="transparent" 
            f_color="#3ea6ff" 
            br_color="#3ea6ff" 
            width="35%"
            onclick={() => {
              window.location.href = "/login";
            }} />
        </div>

        <div className={styles.top_nav__actions__mobile_button}>
          <DefaultButton 
            text="Sign in" 
            bg_color="transparent" 
            f_color="#3ea6ff" 
            br_color="#3ea6ff" 
            width="100%"
            onclick={() => {
              window.location.href = "/login";
            }} />
        </div>
      </div>
    </nav>
  )
}