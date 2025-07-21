import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./style.module.scss";
import { useAppSelector } from "../../store/store";
import { useTranslation } from "react-i18next";
import useIsScreenWidth from "../../hooks/useIsScreenWidth";

interface DashboardLayoutProps {
    children: React.ReactNode;
    title: String;
    icon?: string;
    headerSecondaryChildren?: React.ReactNode;
}

export default function CabinetLayout(props: DashboardLayoutProps) {
    const user = useAppSelector(state => state.userProfile);

    const { t } = useTranslation(); 

    const { isSmallScreen } = useIsScreenWidth({ minScreenWidth: 600 });
    const [isSidebarOpened, setIsSidebarOpened] = useState(false);

    return (
        <>
            <main className={styles["layout"]}>
                <section
                    className={`${styles["layout__sidebar"]} ${isSidebarOpened ? styles["opened"] : ""}`}
                >
                    <Sidebar 
                        title="OmmaTeam"
                        primaryLinks={[
                            {
                                link: '/dashboard',
                                name: t("cabinet.sidebar.dashboard"),
                                icon: '/svg/Dashboard.svg'
                            },
                            {
                                link: '/dashboard/teams',
                                name: t("cabinet.sidebar.teams"),
                                icon: '/svg/Team.svg'
                            },
                            {
                                link: '/dashboard/tasks/calendar',
                                name: t("cabinet.sidebar.calendar"),
                                icon: '/svg/Calendar.svg'
                            },
                        ]}
                        secondaryLinks={[
                            {
                                link: '/dashboard/settings',
                                name: t("cabinet.sidebar.settings"),
                                icon: '/svg/Settings.svg'
                            },
                        ]}
                        profileData={{
                            showProfileData: true,
                            username: user.username,
                            email: user.email,
                            icon: '/icons/UserIcon.png'
                        }}
                    />
                </section>
                <section className={styles["layout__content"]}>
                    <header className={styles["content__header"]}>
                        <div className={styles["content__header-data"]}>
                            <section className={styles["content__header-title"]}>
                                <img src={props.icon ?? '/svg/Dark/Dashboard.svg'} alt="" />
                                <h1>
                                    {props.title}
                                </h1>
                            </section>
                            <section className={styles["content__header-other"]}>
                                {
                                    props.headerSecondaryChildren
                                }
                                {
                                    isSmallScreen && <button onClick={() => setIsSidebarOpened(prev => !prev)}><img src="/svg/Dark/Burger.svg" alt="" /></button>
                                }
                            </section>
                        </div>
                    </header>
                    <main className={styles["content__main"]}>
                        {
                            props.children
                        }
                    </main>
                </section>
            </main>
        </>
    )
}