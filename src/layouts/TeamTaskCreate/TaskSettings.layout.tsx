import { useNavigate } from '@tanstack/react-router';
import { TeamDataType } from '../../api/types/team.types';
import InputField from '../../components/Input/Input.component';
import Select from '../../components/Select/Select.component';
import styles from './styles.module.scss';
import { CreateTaskType, type TaskTypes } from '../../api/types/tasks.types';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export default function TaskSettingsLayout({teamData, form}:{teamData: TeamDataType, form: ReturnType<typeof useForm<CreateTaskType>>}){
    const navigate = useNavigate();

    const { t } = useTranslation(); 

    const selectedTaskType = form.watch('type');

    const responsibleOptions = teamData.teammates.map(tm => ({
        value: tm.id,
        label: tm.user?.username || tm.user?.email || 'Unknown User',
    }));

    const handleChangeTaskType = (type: TaskTypes) => {
        navigate({ to: `?type=${type.toLowerCase()}` });
        handleSelect(type, "type");
    }

    const handleSelect = (value: string, name: string) => {
        form.setValue(name as keyof CreateTaskType, value);
    }

    return (
        <>
            <div className={styles['settings-layout']}>
                <div className={styles['form']}>
                    <InputField 
                        type='text'
                        title={t('pages.team.task.task_name')}
                        isRequired={true}
                        isError={!!form.formState.errors.title}
                        errorText={form.formState.errors.title?.message?.toString() ?? ''}
                        placeholder='Enter task name'
                        {...form.register('title', {required: true})}
                    />
                    <InputField 
                        type='date'
                        title={t('pages.team.task.deadline')}
                        isRequired={true}
                        isError={!!form.formState.errors.deadline}
                        errorText={form.formState.errors.deadline?.message?.toString() ?? ''}
                        placeholder='Enter deadline'
                        {...form.register('deadline', {required: true})}
                    />
                    <Select 
                        title={t('pages.team.task.task_type')}
                        name='type'
                        isRequired={true}
                        options={[
                            {
                                label: 'Small',
                                value: 'DEFAULT'
                            },
                            {
                                label: 'Sub-Tasked',
                                value: 'SUBTASKS'
                            },
                        ]}
                        onChange={(value: string) => handleChangeTaskType(value as TaskTypes)}
                        selectedValue={selectedTaskType}
                    />
                    <Select 
                        title={t('pages.team.task.task_difficulty')}
                        name='hardlevel'
                        isRequired={true}
                        options={[
                            {
                                label: 'Easy',
                                value: 'EASY'
                            },
                            {
                                label: 'Medium',
                                value: 'MEDIUM'
                            },
                            {
                                label: 'Hard',
                                value: 'HARD'
                            },
                        ]}
                        onChange={(value: string)=>handleSelect(value, "hardLevel")}
                    />
                    <Select 
                        title={t('pages.team.task.task_resp')}
                        name='teammateId'
                        isRequired={true}
                        options={responsibleOptions}
                        onChange={(value: string)=>handleSelect(value, "teammateId")}
                    />
                </div>
            </div>
        </>
    )
}