import styles from "./style.module.scss";

export default function WindowLoading() {
  return (
    <>       
        <main>
          <div className={styles['loader']}>
              <span className={styles["load"]}></span>
          </div>
        </main>
    </>
  );
}