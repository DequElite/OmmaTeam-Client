import Loading from "../../components/Loading/Loading.component";
import styles from "./style.module.scss";

export default function DashboardLayout() {

    return (
        <>
            <main className={styles["main"]}>
                <h3>Coming soon...</h3>
                <p>This loading will take longer than usual...</p>
                <Loading />
            </main>
        </>
    )
}