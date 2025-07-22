import { SubmitHandler, useForm } from 'react-hook-form';
import { TeamDataType } from '../../api/types/team.types';
import TextArea from '../../components/TextArea/TextArea.component';
import styles from './styles.module.scss';
import TaskSettingsLayout from './TaskSettings.layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTaskSchema } from '../../api/schemas-validate/task.schema';
import { CreateTaskType, TaskType } from '../../api/types/tasks.types';
import Button from '../../components/Button/Button.component';
import { useMessageBox } from '../../contexts/MessageBoxContext/useMessageBox';
import { useMutation } from '@tanstack/react-query';
import { TaskService } from '../../api/services/Task.service';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

const taskService = new TaskService();

export default function DefaultTaskForm({teamData}: {
  teamData: TeamDataType,
})  {
    const navigate = useNavigate();

    const { updateState } = useMessageBox();

    const { t } = useTranslation(); 

    const form = useForm<CreateTaskType>({
        mode: 'onChange',
        resolver: zodResolver(CreateTaskSchema),
        defaultValues: {
            teamId: teamData.id,
            type: 'DEFAULT',
            hardLevel: 'EASY',
            teammateId: teamData.teammates[0].id
        }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: CreateTaskType) => taskService.createTask(data).then(res => res.data.newTask),
        onSuccess: async (data: TaskType) => {
            console.debug('SUCCESS SENDED');

            updateState({
                isOpened: true,
                type: 'success',
                desc: 'Created success'
            });
            console.log(data)

            navigate({ to: `/team/${teamData.id}/tasks/view/${data.id}` })
        },
        onError: (err: any) => {
            console.error('error: ', err);

            switch(err.status) {
                case 400:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Invalid task type, check the form'
                    });
                    break;
                case 403:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'You aren`t a team leader!'
                    });
                    break;
                case 404:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'It is strange, teammate not found... Why?'
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

    const onSubmit: SubmitHandler<CreateTaskType> = (data: CreateTaskType) => {
        console.debug(data);

        mutate(data);
    };

    return (
        <>
            <form className={styles['editor-layout']} onSubmit={form.handleSubmit(onSubmit)}>
                <section className={styles['editor__details']}>
                    <div className={styles['editor__details-desc']}>
                        <TextArea 
                            title={t('pages.team.task.task_desc')}
                            placeholder="Write a description"
                            isRequired={true}
                            isError={!!form.formState.errors.description}
                            errorText={form.formState.errors.description?.message?.toString() ?? ''}
                            {...form.register('description')}
                        />
                    </div>
                </section>
                <section className={styles['editor__info']}>
                    <TaskSettingsLayout teamData={teamData} form={form}/>
                    <Button 
                        variant='branded'
                        width={100}
                        height={6}
                        type='submit'
                        disabled={isPending}
                    >
                        <span style={{fontSize:'1.1rem', color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'5px'}}>
                            <img src="/svg/Create.svg" alt="" width={20} /> 
                            Create
                        </span>
                    </Button>
                </section>
            </form>
        </>
    )
}