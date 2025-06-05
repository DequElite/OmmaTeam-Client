import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./style.module.scss";

interface DashboardLayoutProps {
    children: React.ReactNode;
    title: String;
    icon?: string;
    headerSecondaryChildren?: React.ReactNode;
}

export default function DashboardLayout(props: DashboardLayoutProps) {
    return (
        <>
            <main className={styles["layout"]}>
                <section className={styles["layout__sidebar"]}>
                    <Sidebar 
                        title="OmmaTeam"
                        primaryLinks={[
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
                            username: 'fsaf',
                            email: 'sfsf@@@',
                            icon: '/icons/UserIcon.png'
                        }}
                    />
                </section>
                <section className={styles["layout__content"]}>
                    <header className={styles["content__header"]}>
                        {props.title}
                    </header>
                    <main className={styles["content__main"]}>

                    </main>
                </section>
            </main>
        </>
    )
}