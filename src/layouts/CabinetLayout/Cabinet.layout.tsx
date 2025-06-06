import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./style.module.scss";
import { useAppSelector } from "../../store/store";

interface DashboardLayoutProps {
    children: React.ReactNode;
    title: String;
    icon?: string;
    headerSecondaryChildren?: React.ReactNode;
}

export default function CabinetLayout(props: DashboardLayoutProps) {
    const user = useAppSelector(state => state.userProfile);

    return (
        <>
            <main className={styles["layout"]}>
                <section className={styles["layout__sidebar"]}>
                    <Sidebar 
                        title="OmmaTeam"
                        primaryLinks={[
                            {
                                link: '/dashboard',
                                name: 'Dashboard',
                                icon: '/svg/Dashboard.svg'
                            },
                            {
                                link: '/dashboard/teams',
                                name: 'Teams',
                                icon: '/svg/Team.svg'
                            },
                            {
                                link: '/dashboard/tasks/calendar',
                                name: 'Calendar',
                                icon: '/svg/Calendar.svg'
                            },
                        ]}
                        secondaryLinks={[
                            {
                                link: '/dashboard/settings',
                                name: 'Settings',
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