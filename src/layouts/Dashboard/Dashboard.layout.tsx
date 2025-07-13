import Loading from "../../components/Loading/Loading.component";
import styles from "./style.module.scss";

export default function DashboardLayout() {

    return (
        <>
            <main className={styles["main"]}>
                <h3>Coming soon...</h3>
                <p>
                    It will be released after the first demo version.
                    <br />
                    The demo is planned for 01/08/2025.
                </p>
                <Loading />
            </main>
        </>
    )
}