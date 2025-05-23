import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
import { useState } from "react";

export function LanguageBox(){
    const { t, i18n } = useTranslation();
    const [lang , setLang] = useState<'en' | 'uk'>('en');

    const handleChangeLang = () => {
        const newLang = i18n.language === 'en' ? 'uk' : 'en';
        setLang(newLang);
        i18n.changeLanguage(newLang);
    };


    return (
        <>
            <button className={styles['language_btn']} onClick={handleChangeLang}>
                {lang.toUpperCase()}
            </button>
        </>
    )
}