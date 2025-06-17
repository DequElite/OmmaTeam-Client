'use client'

import styles from "./style.module.scss";

export default function Loading() {
  return (
    <>       
        <div className={styles['loader']}>
            <span className={styles["load"]}></span>
        </div>
    </>
  );
}