import PasswordFormLayout from "./PasswordForm.layout";
import ProfileFormLayout from "./ProfileForm.layout";
import styles from "./style.module.scss";

export default function SettingsLayout() {
    return (
        <>
            <main className={styles["layout"]}>
                <section className={styles["layout__profile"]}>
                    <header className={styles["title"]}>
                        <h3>
                            Profile
                        </h3>
                    </header>
                    <ProfileFormLayout />
                </section>
                <section className={styles["layout__password"]}>
                    <header className={styles["title"]}>
                        <h3>
                            Password
                        </h3>
                    </header>
                    <PasswordFormLayout />
                </section>
            </main>
        </>
    )
}