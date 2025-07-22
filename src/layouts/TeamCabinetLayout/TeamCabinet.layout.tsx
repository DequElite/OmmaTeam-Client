import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./style.module.scss";
import { useAppSelector } from "../../store/store";
// import { useTranslation } from "react-i18next";
import useTeamLoad from "../../hooks/team/useTeamLoad";
import useIsScreenWidth from "../../hooks/useIsScreenWidth";
import { useTranslation } from "react-i18next";

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

    const { data: teamData } = useTeamLoad(props.teamId);
    const isLeader = teamData?.isLeader;

    const { isSmallScreen } = useIsScreenWidth({ minScreenWidth: 600 });
    const [isSidebarOpened, setIsSidebarOpened] = useState(false);

    return (
        <>
            <main className={styles["layout"]}>
                <section
                    className={`${styles["layout__sidebar"]} ${isSidebarOpened ? styles["opened"] : ""}`}
                >
                    <Sidebar 
                        title={teamData?.name || 'OmmaTeam'}
                        primaryLinks={[
                            {
                                link: '/dashboard',
                                name: t('pages.team.sidebar.home'),
                                icon: '/svg/Home.svg'
                            },
                            {
                                link:  `/team/${props.teamId}/tasks`,
                                name: t('pages.team.sidebar.tasks'),
                                icon: '/svg/Tasks.svg'
                            },
                            {
                                link: `/team/${props.teamId}/chat`,
                                name: t('pages.team.sidebar.chat'),
                                icon: '/svg/Chat.svg'
                            },
                            // {
                            //     link: `/team/${props.teamId}/calendar`,
                            //     name: 'Calendar',
                            //     icon: '/svg/Calendar.svg'
                            // },
                            {
                                link: `/team/${props.teamId}/teammates`,
                                name: t('pages.team.sidebar.teammates'),
                                icon: '/svg/Team.svg'
                            },
                        ]}
                        secondaryLinks={isLeader ? [
                            {
                                link: `/team/${props.teamId}/leader/task`,
                                name: t('pages.team.sidebar.task'),
                                icon: '/svg/Task.svg'
                            },
                            {
                                link: `/team/${props.teamId}/leader/settings`,
                                name: t('pages.team.sidebar.settings'),
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