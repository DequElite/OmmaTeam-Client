import { SubmitHandler, useForm } from "react-hook-form";
import { TeamDataType } from "../../api/types/team.types";
import styles from "./styles.module.scss";
import { CreateTaskType } from "../../api/types/tasks.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTaskSchema } from "../../api/schemas-validate/task.schema";
import TextArea from "../../components/TextArea/TextArea.component";
import TaskSettingsLayout from "./TaskSettings.layout";
import Button from "../../components/Button/Button.component";
import { isPending } from "@reduxjs/toolkit";

export default function SubtaskedTaskForm({teamData}:{teamData: TeamDataType}){
        const form = useForm<CreateTaskType>({
            mode: 'onChange',
            resolver: zodResolver(CreateTaskSchema),
            defaultValues: {
                teamId: teamData.id,
                type: 'SUBTASKS',
                hardLevel: 'EASY',
                teammateId: teamData.teammates[0].id
            }
        })
    
        const onSubmit: SubmitHandler<CreateTaskType> = (data: CreateTaskType) => {
            console.log(data);
        };
    
    return (
        <>
            <form className={styles['editor-layout']} onSubmit={form.handleSubmit(onSubmit)}>
                <section className={styles['editor__details']}>
                    <div className={styles['editor__details-desc']}>
                        <TextArea 
                            title='Task Description'
                            isRequired={true}
                            isError={!!form.formState.errors.description}
                            errorText={form.formState.errors.description?.message?.toString() ?? ''}
                            {...form.register('description')}
                        />
                    </div>
                    <div className={styles['editor__details-subtasks']}>
                        <h3>
                            Sub Tasks
                        </h3>
                    </div>
                </section>
                <section className={styles['editor__info']}>
                    <TaskSettingsLayout teamData={teamData} form={form}/>
                    <Button 
                        variant='branded'
                        width={100}
                        height={6}
                        type='submit'
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

//TODO: СДЕЛАЙ БЛОК САБ ТАСКОВ И ЛОГИКУ ОТПРАВКИ НА СОЗДАНИЕ