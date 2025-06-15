import { useTranslation } from "react-i18next";
import PasswordFormLayout from "./PasswordForm.layout";
import ProfileFormLayout from "./ProfileForm.layout";
import styles from "./style.module.scss";

export default function SettingsLayout() {
    const { t } = useTranslation();
    
    return (
        <>
            <main className={styles["layout"]}>
                <section className={styles["layout__profile"]}>
                    <header className={styles["title"]}>
                        <h3>
                            {t('other.profile')}
                        </h3>
                    </header>
                    <ProfileFormLayout />
                </section>
                <section className={styles["layout__password"]}>
                    <header className={styles["title"]}>
                        <h3>
                            {t('other.password')}
                        </h3>
                    </header>
                    <PasswordFormLayout />
                </section>
            </main>
        </>
    )
}