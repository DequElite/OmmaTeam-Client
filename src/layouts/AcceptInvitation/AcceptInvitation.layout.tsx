import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
import Button from "../../components/Button/Button.component";
import { useMutation } from "@tanstack/react-query";
import { TeamService } from "../../api/services/Team.service";
import { AcceptInvitationType } from "../../api/types/team.types";
import { useMessageBox } from "../../contexts/MessageBoxContext/useMessageBox";
import { useNavigate } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getUserTeamsShortData } from "../../store/services/userTeams.service";

const teamService = new TeamService();

export default function AcceptInvitation({token}:{token:string}){
    const { t } = useTranslation();
    const { updateState } = useMessageBox();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const userEmail = useAppSelector(state => state.userProfile.email);

    const { mutate } = useMutation({
        mutationFn: (data: AcceptInvitationType) => teamService.acceptInvitation(data),
        onSuccess: async () => {

            await dispatch(getUserTeamsShortData());

            updateState({
                isOpened: true,
                type: 'success',
                desc: 'You now in team!'
            });

            navigate({ to: '/', replace: true });
        },
        onError: (err: any) => {
            console.error('error: ', err);

            switch(err.status) {
                case 400:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Token expired or invalid!'
                    });
                    break;
                case 404:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Teammate or token not found'
                    });
                    break;
                default:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Unknown error'
                    });
                    break;
            }
        },
    });

    const handleConfirm = () => {
        console.log(userEmail, token)
        mutate({
            email: userEmail,
            inviteToken: token
        });
    };

    const handleDisgard = () => {
        updateState({
            isOpened: true,
            type: 'info',
            desc: 'Nothing has changed'
        });
        
        navigate({ to: '/', replace: true });
    }

    return (
        <>
            <main className={styles['layout']}>
                <div className={styles['layout__form']}>
                    <div className={styles['layout__form-container']}>
                        <header className={styles['layout__form-header']}>
                            <img 
                                src="/icons/OmmaTeam.png" 
                                alt="OmmaTeam icon" 
                                className={styles['layout__form-header-img']}
                            />
                            <h1 className={styles['layout__form-header-title']}>
                                Accept team invitation
                            </h1>
                        </header>
                        <hr className={styles['layout__form-line']}/>
                        <div className={styles['layout__form-box']}>
                            <div className={styles['layout__form-window']}>
                                <h3>
                                    Do you accept invitation?
                                </h3>
                                <div className={styles['layout__form-window-buttons']}>
                                    <Button
                                        variant='branded'
                                        width={43}
                                        height={5}
                                        onClick={handleConfirm}
                                    >
                                        <span style={{fontSize:'1rem'}}>
                                            Yes
                                        </span>
                                    </Button>
                                    <Button
                                        variant='dark'
                                        width={43}
                                        height={5}
                                        onClick={handleDisgard}
                                    >
                                        <span style={{fontSize:'1rem'}}>
                                            No
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className={styles['layout__preview']}>
                    <div className={styles['layout__preview-container']}>
                        <h1>OmmaTeam</h1>
                        <h4>
                            <strong>{t("omma_desc.desc")}</strong>
                        </h4>
                    </div>
                </section>
            </main>
        </>
    )
}