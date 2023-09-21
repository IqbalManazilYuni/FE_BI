import style from "./footer.css";
function Footer() {
    return (
        <div className="">
        <footer class="footer" style={style}>
        <div class="content has-text-centered">
          <p>
            <strong>App LBI</strong> by{" "}
            <a href="http://lbi.si.fti.unand.ac.id/">Laboratory Bussiness Intelligence</a>. CopyRight @2023
          </p>
        </div>
      </footer>
    </div>
    );
  }
  
  export default Footer;