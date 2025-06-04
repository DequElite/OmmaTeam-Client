import { Link, useLocation } from "@tanstack/react-router";
import styles from "./style.module.scss";
import { useEffect, useMemo } from "react";

interface ISidebarLink {
    link: string;
    name: string;
    icon?: string;
}

interface SidebarProps {
    title: string;
    primaryLinks: ISidebarLink[];
    secondaryLinks?: ISidebarLink[];
    className?: string;
    profileData?: {
        showProfileData: boolean;
        username: string;
        email: string;
        icon?: string;
    } 
}

function SidebarLink(props: ISidebarLink) {
    const { pathname } = useLocation();

    return (
        <Link
            className={`${styles["link"]} ${
                pathname === props.link
                ? styles["activated"]
                : styles["non-activated"]
            }`}
            to={props.link}
        >
            <img src={props.icon ?? ''}/>
            <p>
                {
                    props.name
                }
            </p>
        </Link>
    )
}

export default function Sidebar(props: SidebarProps){

    const primaryLinksRender = useMemo(() => 
        props.primaryLinks.map((link) => (
            <SidebarLink 
                key={link.link}
                {...link}
            />
        ))
    , [props.primaryLinks]);

    const secondaryLinksRender = useMemo(() =>
        props.secondaryLinks?.map((link) => (
            <SidebarLink 
                key={link.link}
                {...link}
            />
        )) || null
    , [props.secondaryLinks]);

    return (
        <>
            <aside className={styles["sidebar"]}>
                <header className={styles["sidebar__header"]}>
                    <h1 className={styles["sidebar__title"]}>
                        { props.title }
                    </h1>
                </header>
                <nav className={styles["sidebar__main"]}>
                    <section className={styles["sidebar__main-primarylinks"]}>
                        {primaryLinksRender}
                    </section>
                    <section className={styles["sidebar__main-secondarylinks"]}>
                        {secondaryLinksRender}
                        {
                            props.profileData?.showProfileData && 
                            <div className={styles["secondarylinks__profile"]}>
                                <img src={props.profileData.icon ?? ''} alt="" />
                                <div className={styles["secondarylinks__profile-data"]}>
                                    <h3>
                                        {
                                            props.profileData.username
                                        }
                                    </h3>
                                    <p>
                                        {
                                            props.profileData.email
                                        }
                                    </p>
                                </div>
                            </div>
                        }
                    </section>
                </nav>
            </aside>
        </>
    )
}