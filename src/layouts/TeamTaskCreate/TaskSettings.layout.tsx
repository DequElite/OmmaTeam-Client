import { useNavigate } from '@tanstack/react-router';
import { TeamDataType } from '../../api/types/team.types';
import InputField from '../../components/Input/Input.component';
import Select from '../../components/Select/Select.component';
import styles from './styles.module.scss';
import { CreateTaskType, type TaskTypes } from '../../api/types/tasks.types';
import { useForm } from 'react-hook-form';

export default function TaskSettingsLayout({teamData, form}:{teamData: TeamDataType, form: ReturnType<typeof useForm<CreateTaskType>>}){
    const navigate = useNavigate();

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
                        title='Task name'
                        isRequired={true}
                        isError={!!form.formState.errors.title}
                        errorText={form.formState.errors.title?.message?.toString() ?? ''}
                        placeholder='Enter task name'
                        {...form.register('title')}
                    />
                    <InputField 
                        type='date'
                        title='Task deadline'
                        isRequired={true}
                        isError={!!form.formState.errors.deadline}
                        errorText={form.formState.errors.deadline?.message?.toString() ?? ''}
                        placeholder='Enter deadline'
                        {...form.register('deadline')}
                    />
                    <Select 
                        title='Task type'
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
                    />
                    <Select 
                        title='Task difficulty'
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
                        onChange={(value: string)=>handleSelect(value, "hardlevel")}
                    />
                    <Select 
                        title='Task responsible'
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