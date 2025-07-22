import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/Button/Button.component";
import InputField from "../../components/Input/Input.component";
import styles from "./style.module.scss";
import { DeleteTeammateType } from "../../api/types/team.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailField } from "../../api/schemas-validate/global.schemas";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { TeamService } from "../../api/services/Team.service";
import { useMessageBox } from "../../contexts/MessageBoxContext/useMessageBox";
import { useTranslation } from "react-i18next";

const teamService = new TeamService();

export default function DeleteUserLayout({teamId}:{teamId: string}){
    const { updateState } = useMessageBox();

    const { t } = useTranslation(); 

    const { register, handleSubmit, formState: {errors} } = useForm({
        mode: 'onChange',
        resolver: zodResolver(z.object({email:emailField}))
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: DeleteTeammateType) => teamService.deleteTeammate(data),
        onSuccess: async () => {
            console.debug('SUCCESS SENDED');

            updateState({
                isOpened: true,
                type: 'success',
                desc: 'Deleted success'
            });
        },
        onError: (err: any) => {
            console.error('error: ', err);

            switch(err.status) {
                case 404:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Teammate not found'
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
    })

    const onSubmit: SubmitHandler<{email:string}> = async (data: {email:string}) => {
        mutate({ teamId, teammateEmail: data.email });
    }

    return (
        <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
            <header className={styles['form__header']}>
                <h3>
                    {t('pages.team.settings.del_user')}
                </h3>
            </header>
            <InputField 
                placeholder="For Example: dexTeam"
                type="email"
                title='Teammate email'
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
                    <img src="/svg/Delete.svg" alt="" /> 
                    Delete teammate
                </span>
            </Button>
        </form>
    )
}