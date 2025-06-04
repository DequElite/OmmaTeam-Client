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
                                link: '/dashboard',
                                name: 'Dashboard'
                            },
                            {
                                link: '/dashboard/settings',
                                name: 'team'
                            },
                        ]}
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