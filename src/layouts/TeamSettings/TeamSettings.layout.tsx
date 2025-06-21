import ChangeTeamNameLayout from "./ChangeTeamName.layout";
import DeleteUserLayout from "./DeleteUser.layout";
import InviteUserLayout from "./InviteUser.layout";
import styles from "./style.module.scss";

export default function TeamSettingsLayout({teamId}:{teamId: string}){
    return (
        <>
            <main className={styles['layout']}>
                <ChangeTeamNameLayout teamId={teamId}/>
                <DeleteUserLayout teamId={teamId} />
                <InviteUserLayout teamId={teamId} />
            </main>
        </>
    )
}