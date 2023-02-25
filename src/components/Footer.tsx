import style from "./Footer.module.sass";

export default function Footer() {
  return (
    <footer className={style.footer}>
      Laget med ❤️ av{" "}
      <a className={style.link} href="https://github.com/havardnyboe">
        havardnyboe
      </a>
    </footer>
  );
}
