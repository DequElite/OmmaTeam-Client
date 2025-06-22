import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";

export default function AcceptInvitation({token}:{token:string}){
    const { t } = useTranslation();

    return (
        <>
            <main className={styles['authlayout']}>
                <div className={styles['authlayout__form']}>
                    <div className={styles['authlayout__form-container']}>
                        <header className={styles['authlayout__form-header']}>
                            <img 
                                src="/icons/OmmaTeam.png" 
                                alt="OmmaTeam icon" 
                                className={styles['authlayout__form-header-img']}
                            />
                            <h1 className={styles['authlayout__form-header-title']}>
                                Accept team invitation
                            </h1>
                        </header>
                        <hr className={styles['authlayout__form-line']}/>
                    </div>
                </div>
                <section className={styles['authlayout__preview']}>
                    <div className={styles['authlayout__preview-container']}>
                        <h1>OmmaTeam</h1>
                        <h4>
                            <strong>{t("omma_desc.desc")}</strong>
                        </h4>
                    </div>
                </section>
            </main>
        </>
    )
}