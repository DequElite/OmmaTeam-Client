import React from "react";
import styles from "./style.module.scss";

type AuthType = 'SignUp' | 'LogIn' | 'ResetPassword' | 'ForgotPassoword';
interface AuthProps {
    children: React.ReactNode;
    authType: AuthType;
    desc?: React.ReactNode;
}

const AUTH_TITLES: Record<AuthType, string> = {
    SignUp: 'Get Started',
    LogIn: 'Welcome back',
    ForgotPassoword: 'Forgot Password?',
    ResetPassword: 'Reset to new password'
}

export default function AuthLayout(props: AuthProps) {
    return (
        <>
            <main className={styles['authlayout']}>
                <form className={styles['authlayout__form']}>
                    <div className={styles['authlayout__form-container']}>
                        <header className={styles['authlayout__form-header']}>
                            <img 
                                src="/icons/OmmaTeam.png" 
                                alt="OmmaTeam icon" 
                                className={styles['authlayout__form-header-img']}
                            />
                            <h1 className={styles['authlayout__form-header-title']}>
                                {AUTH_TITLES[props.authType]}
                            </h1>
                            <p className={styles['authlayout__form-header-desc']}>
                                {props.desc}
                            </p>
                        </header>
                        <hr className={styles['authlayout__form-line']}/>
                        {props.children}
                    </div>
                </form>
                <section className={styles['authlayout__preview']}>
                    <div className={styles['authlayout__preview-container']}>
                        <h1>OmmaTeam</h1>
                        <h4>
                            <strong>Perform team tasks conveniently and quickly</strong>
                        </h4>
                    </div>
                </section>
            </main>
            {/* {props.children} */}
        </>
    );
  }