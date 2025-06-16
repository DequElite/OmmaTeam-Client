import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/Button/Button.component';
import InputField from '../../components/Input/Input.component';
import styles from './style.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTeamSchema } from '../../api/schemas-validate/team.schema';
import { CreateTeamType } from '../../api/types/team.types';
import { useMessageBox } from '../../contexts/MessageBoxContext/useMessageBox';
import { useAppDispatch } from '../../store/store';
import { useMutation } from '@tanstack/react-query';
import { TeamService } from '../../api/services/Team.service';
import { getUserTeamsShortData } from '../../store/services/userTeams.service';
import { useNavigate } from '@tanstack/react-router';

const teamService = new TeamService();

export default function CreateTeamLayout(){
    const { updateState } = useMessageBox();

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { register, handleSubmit, formState: {errors} } = useForm({
        mode: 'onChange',
        resolver: zodResolver(CreateTeamSchema)
    });

    const { mutate } = useMutation({
        mutationFn: (data: CreateTeamType) => teamService.createTeam(data),
        onSuccess: async (data: any) => {
            console.debug('SUCCESS SENDED');

            await dispatch (getUserTeamsShortData());

            updateState({
                isOpened: true,
                type: 'success',
                desc: 'Created success'
            });

            navigate({
                to: '..'
            });
        },  
        onError: (err: any) => {
            console.error('error: ', err);

            switch(err.status) {
                case 400:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Team already exists'
                    });
                    break;
                case 401:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Unauthorized'
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

    const onSubmit: SubmitHandler<CreateTeamType> = async (data:CreateTeamType) => {
        console.debug('DATA ON  SUBMIT: ', data);
    
        mutate(data)
    }

    return (
        <>
            <main className={styles['layout']}>
                <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
                    <header className={styles['form__header']}>
                        <h3>
                            Create your team
                        </h3>
                    </header>
                    <InputField 
                        placeholder="For Example: dexTeam"
                        type="text"
                        title={'Just write team name'}
                        isRequired={true}
                        isError={!!errors.name}
                        errorText={typeof errors.name?.message === 'string' ? errors.name.message : ''}
                        {...register('name')}
                    />
                    <Button 
                        variant='branded'
                        width={100}
                        height={6}
                        type='submit'
                    >
                        <span style={{fontSize:'1.15rem', color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'10px'}}>
                            <img src="/svg/Create.svg" alt="" /> 
                            Create
                        </span>
                    </Button>
                </form>
            </main>
        </>
    )
}