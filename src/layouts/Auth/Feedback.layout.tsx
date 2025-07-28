import { useTranslation } from "react-i18next";
import Select from "../../components/Select/Select.component";
import styles from "./style.module.scss";
import TextArea from "../../components/TextArea/TextArea.component";
import Button from "../../components/Button/Button.component";
import { ModerationService } from "../../api/services/Moderation.service";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateFeedbackType, FeedbackRates } from "../../api/types/moderation.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateFeedbackSchema } from "../../api/schemas-validate/moderation.schemas";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useMessageBox } from "../../contexts/MessageBoxContext/useMessageBox";

const moderationService = new ModerationService();

export default function FeedbackLayout(){
    const navigate = useNavigate();
    const { updateState } = useMessageBox();
    const { t } = useTranslation();

    const form = useForm<CreateFeedbackType>({
        mode: 'onChange',
        resolver: zodResolver(CreateFeedbackSchema),
        defaultValues:{
            rate: 'EXCELLENT'
        }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: CreateFeedbackType) => moderationService.createFeedback(data),
        onSuccess: async () => {
            updateState({
                isOpened: true,
                type: 'success',
                desc: 'Thanks!'
            });

            navigate({ to:'/#third', replace: true  })
        },
        onError: (err: any) => {
            console.error('error: ', err);

            switch(err.status) {
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
        },
    });

    const handleSelect = (value: string, name: string) => {
        form.setValue(name as keyof CreateFeedbackType, value);
    }

    const onSubmit: SubmitHandler<CreateFeedbackType> = (data: CreateFeedbackType) => {
        mutate(data);
    }

    return (
        <>
            <form 
                className={styles['form-shell']} 
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <Select 
                    title={t('forms.Feedback.field1')}
                    name='rate'
                    isRequired={true}
                    options={[
                        {
                            label: 'Excellent',
                            value: 'EXCELLENT'
                        },
                        {
                            label: 'Average',
                            value: 'AVERAGE'
                        },
                        {
                            label: 'Bad',
                            value: 'BAD'
                        },
                    ]}
                    onChange={(value:string)=>handleSelect(value as FeedbackRates, "rate")}
                />
                <TextArea 
                    title={t('forms.Feedback.field2')}
                    placeholder="Write a description"
                    isRequired={true}
                    isError={!!form.formState.errors.desc}
                    errorText={form.formState.errors.desc?.message?.toString() ?? ''}
                    {...form.register("desc")}
                />
                <br style={{marginTop: '5vh'}} />
                <Button 
                    variant='branded'
                    width={100}
                    height={6}
                    type='submit'
                    disabled={isPending}
                >
                    <span style={{fontSize:'1.15rem', color:"#FFFFFF"}}>
                        Send
                    </span>
                </Button>
            </form>
        </>
    )
}