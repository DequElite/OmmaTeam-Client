import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { TeamDataType } from "../../api/types/team.types";
import styles from "./styles.module.scss";
import { CreateTaskType } from "../../api/types/tasks.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTaskSchema, MAX_SUBTASKS } from "../../api/schemas-validate/task.schema";
import TextArea from "../../components/TextArea/TextArea.component";
import TaskSettingsLayout from "./TaskSettings.layout";
import Button from "../../components/Button/Button.component";
import InputField from "../../components/Input/Input.component";
import { useMessageBox } from "../../contexts/MessageBoxContext/useMessageBox";
import { useMutation } from "@tanstack/react-query";
import { TaskService } from "../../api/services/Task.service";

const taskService = new TaskService();

export default function SubtaskedTaskForm({teamData}:{teamData: TeamDataType}){
    const { updateState } = useMessageBox();

    const form = useForm<CreateTaskType>({
        mode: 'onChange',
        resolver: zodResolver(CreateTaskSchema),
        defaultValues: {
            teamId: teamData.id,
            type: 'SUBTASKS',
            hardLevel: 'EASY',
            teammateId: teamData.teammates[0].id,
            subtasks: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "subtasks",
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: CreateTaskType) => taskService.createTask(data),
        onSuccess: async (data: any) => {
            console.debug('SUCCESS SENDED');

            updateState({
                isOpened: true,
                type: 'success',
                desc: 'Created success'
            });
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

    const handleAddSubtask = () => {
        if (fields.length < MAX_SUBTASKS) {
            append({ name: "", status: 'IN_THE_PROGRESS' });
        } else {
            updateState({
                isOpened: true,
                type: 'warning',
                desc: `Maximum ${MAX_SUBTASKS} subtasks`
            });
        }
    };


    const onSubmit: SubmitHandler<CreateTaskType> = (data: CreateTaskType) => {
        console.log(data);

        mutate(data);
    };

    return (
        <>
            <form className={styles['editor-layout']} onSubmit={form.handleSubmit(onSubmit)}>
                <section className={styles['editor__details']}>
                    <div className={styles['editor__details-desc']}>
                        <TextArea 
                            title='Task Description'
                            placeholder="Write a description"
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
                        <div className={styles['subtasks-container']}>
                            <ul className={styles['subtasks-list']}>
                                {fields.map((field, index) => (
                                    <li key={field.id} className={styles["subtask"]}>
                                        <InputField
                                            {...form.register(`subtasks.${index}.name` as const, { required: true })}
                                            title={`SubTask ${index + 1}`}
                                            isRequired={true}
                                            errorText={form.formState.errors.subtasks?.[index]?.name?.message ?? ""}
                                            isError={!!form.formState.errors.subtasks?.[index]?.name}
                                            isTitle={false}
                                            placeholder="Enter subtask text"
                                        />
                                        <button type="button" onClick={() => remove(index)}>
                                            <img src="/svg/RecBin.svg" alt="Remove subtask" />
                                        </button>
                                    </li>
                                ))}

                                <li className={styles["subtask-new"]} onClick={handleAddSubtask}>
                                    Add sub task
                                </li>
                            </ul>
                        </div>
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