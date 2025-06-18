'use client'

import React from "react";
import styles from "./style.module.scss";
import { useTranslation } from "react-i18next";

type AuthType = 'SignUp' | 'LogIn' | 'ResetPassword' | 'ForgotPassoword' | 'GoogleSign';
interface AuthProps {
    children: React.ReactNode;
    authType: AuthType;
    desc?: React.ReactNode;
}

export default function AuthLayout(props: AuthProps) {
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
                                {t(`forms.${props.authType}.title`)}
                            </h1>
                            <div className={styles['authlayout__form-header-desc']}>
                                {props.desc}
                            </div>
                        </header>
                        <hr className={styles['authlayout__form-line']}/>
                        {props.children}
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
            {/* {props.children} */}
        </>
    );
  }