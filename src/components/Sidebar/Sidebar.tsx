import styles from "./style.module.scss";

interface SidebarLink {
    link: string;
    name: string;
    icon?: string;
}

interface SidebarProps {
    title: string;
    primaryLinks: SidebarLink[];
    secondaryLinks?: SidebarLink[];
    className?: string;
}

export default function Sidebar(props: SidebarProps){
    return (
        <>
            <aside className={styles["sidebar"]}>
                <header className={styles["sidebar__header"]}>
                    <h1 className={styles["sidebar__title"]}>
                        { props.title }
                    </h1>
                </header>
            </aside>
        </>
    )
}