import React from "react";
import style from "./Loader2.module.css";

function Loader2() {
  return (
    <div className={style.dotSpinner}>
      <div className={style.dotSpinner__dot}></div>
      <div className={style.dotSpinner__dot}></div>
      <div className={style.dotSpinner__dot}></div>
      <div className={style.dotSpinner__dot}></div>
      <div className={style.dotSpinner__dot}></div>
      <div className={style.dotSpinner__dot}></div>
      <div className={style.dotSpinner__dot}></div>
      <div className={style.dotSpinner__dot}></div>
    </div>
  );
}

export default Loader2;
