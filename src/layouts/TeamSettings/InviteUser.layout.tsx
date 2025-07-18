import { SubmitHandler, useForm } from "react-hook-form";
import { TeamService } from "../../api/services/Team.service";
import Button from "../../components/Button/Button.component";
import InputField from "../../components/Input/Input.component";
import { useMessageBox } from "../../contexts/MessageBoxContext/useMessageBox";
import styles from "./style.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { emailField } from "../../api/schemas-validate/global.schemas";
import { useMutation } from "@tanstack/react-query";
import { InviteTeammateType } from "../../api/types/team.types";

const teamService = new TeamService();

export default function InviteUserLayout({teamId}:{teamId: string}){
    const { updateState } = useMessageBox();
    
    const { register, handleSubmit, formState: {errors} } = useForm({
        mode: 'onChange',
        resolver: zodResolver(z.object({email:emailField}))
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: InviteTeammateType) => teamService.inviteTeammate(data),
        onSuccess: async () => {
            console.debug('SUCCESS SENDED');

            updateState({
                isOpened: true,
                type: 'success',
                desc: 'Invited success'
            });
        },
        onError: (err: any) => {
            console.error('error: ', err);

            switch(err.status) {
                case 400:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'User already in team'
                    });
                    break;
                case 404:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'User or team not found'
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

    const onSubmit: SubmitHandler<{email:string}> = async (data: {email:string}) => {
        console.debug('DATA ON  SUBMIT: ', data);
    
        mutate({teamId, email: data.email})
    }

    return (
        <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
            <header className={styles['form__header']}>
                <h3>
                    Invite user to team
                </h3>
            </header>
            <InputField 
                placeholder="For Example: dexTeam"
                type="email"
                title='User email'
                isRequired={true}
                isError={!!errors.email}
                errorText={errors.email?.message?.toString() ?? ''}
                {...register('email')}
            />
            <Button 
                variant='branded'
                width={100}
                height={6}
                type='submit'
                disabled={isPending}
            >
                <span style={{fontSize:'1.15rem', color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'10px'}}>
                    <img src="/svg/Invite.svg" alt="" /> 
                    Invite user
                </span>
            </Button>
        </form>
    )
}