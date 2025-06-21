import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./style.module.scss";
import { useAppSelector } from "../../store/store";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../main";

interface DashboardLayoutProps {
    children: React.ReactNode;
    title: String;
    icon?: string;
    headerSecondaryChildren?: React.ReactNode;
    teamId: string;
}

export default function TeamCabinetLayout(props: DashboardLayoutProps) {
    const user = useAppSelector(state => state.userProfile);

    const { t } = useTranslation(); 

    const isLeader = queryClient.getQueryData(['team', props.teamId]);

    return (
        <>
            <main className={styles["layout"]}>
                <section className={styles["layout__sidebar"]}>
                    <Sidebar 
                        title="OmmaTeam"
                        primaryLinks={[
                            {
                                link: '/dashboard',
                                name: 'Home',
                                icon: '/svg/Dashboard.svg'
                            },
                            {
                                link: '/dashboard/teams',
                                name: 'Tasks',
                                icon: '/svg/Team.svg'
                            },
                            {
                                link: '/dashboard/tasks/calendar',
                                name: 'Chat',
                                icon: '/svg/Calendar.svg'
                            },
                            {
                                link: '/dashboard/tasks/calendar',
                                name: 'Calendar',
                                icon: '/svg/Calendar.svg'
                            },
                            {
                                link: '/dashboard/tasks/calendar',
                                name: 'Teammates',
                                icon: '/svg/Team.svg'
                            },
                        ]}
                        secondaryLinks={isLeader ? [
                            {
                                link: '/dashboard/settings',
                                name: 'Task',
                                icon: '/svg/Settings.svg'
                            },
                            {
                                link: '/dashboard/settings',
                                name: 'Settings',
                                icon: '/svg/Settings.svg'
                            },
                        ] : []}
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