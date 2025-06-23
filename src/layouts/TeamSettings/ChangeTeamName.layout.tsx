import { SubmitHandler, useForm } from "react-hook-form";
import { TeamService } from "../../api/services/Team.service";
import Button from "../../components/Button/Button.component";
import InputField from "../../components/Input/Input.component";
import styles from "./style.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usernameField } from "../../api/schemas-validate/global.schemas";
import { useMutation } from "@tanstack/react-query";
import { ChangeTeamNameType } from "../../api/types/team.types";
import { useMessageBox } from "../../contexts/MessageBoxContext/useMessageBox";
import { useNavigate } from "@tanstack/react-router";

const teamService = new TeamService();

export default function ChangeTeamNameLayout({teamId}:{teamId: string}){
    const { updateState } = useMessageBox();

    const navigate = useNavigate();

    const { register, handleSubmit, formState: {errors} } = useForm({
        mode: 'onChange',
        resolver: zodResolver(z.object({name: usernameField})),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: ChangeTeamNameType) => teamService.changeTeamName(data),
        onSuccess: async (data: any) => {
            console.debug('SUCCESS SENDED');

            updateState({
                isOpened: true,
                type: 'success',
                desc: 'Team name chenged success'
            });

            navigate({ to: '/', reloadDocument: true })
        },
        onError: (err: any) => {
            console.error('error: ', err);

            switch(err.status) {
                case 400:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Team not exists'
                    });
                    break;
                case 401:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Unauthorized'
                    });
                    break;
                case 403:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'You are not leader of team'
                    });
                    break;
                case 404:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Team not found'
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
        }
    });

    const onSubmit: SubmitHandler<{name:string}> = async (data: {name:string}) => {
        mutate({ teamId, name: data.name })
    }

    return (
        <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
            <header className={styles['form__header']}>
                <h3>
                    Team name
                </h3>
            </header>
            <InputField 
                placeholder="For Example: dexTeam"
                type="text"
                title='New team name'
                isRequired={true}
                isError={!!errors.name}
                errorText={errors.name?.message?.toString() ?? ''}
                {...register('name')}
            />
            <Button 
                variant='branded'
                width={100}
                height={6}
                type='submit'
                disabled={isPending}
            >
                <span style={{fontSize:'1.15rem', color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'10px'}}>
                    <img src="/svg/Change.svg" alt="" /> 
                    Change name
                </span>
            </Button>
        </form>
    )
}