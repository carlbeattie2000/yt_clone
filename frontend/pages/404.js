import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

export default function NotFound() {
  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", textAlign: "center", gap: "1rem"}}>
      <img src="https://www.gstatic.com/youtube/src/web/htdocs/img/monkey.png" />
      <p style={{color: "#fff", fontSize: "2rem", width: "30%"}}>This page isn't available. Sorry about that. Try searching for something else.</p>

      <div style={{display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center"}}>
        <img alt="logo" src="https://www.gstatic.com/youtube/img/branding/youtubelogo/1x/youtubelogo_30.png" />
        <div style={{display: "flex"}}>
          <input type="search" placeholder="Search" style={{padding: "1rem", fontSize: "1.4rem"}}></input>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "1rem", backgroundColor: "#fff", fontSize: "2rem"}}>
            <AiOutlineSearch />
          </div>
        </div>
      </div>
    </div>
  )
}