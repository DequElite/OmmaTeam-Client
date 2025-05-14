import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./style.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPassowrdSchema } from "../../api/schemas-validate/register.schema";
import InputField from "../../components/Input/Input.component";
import { ForgotPassowrd } from "../../api/types/user.types";
import Button from "../../components/Button/Button.component";
import { useAppDispatch } from "../../store/store";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../api/services/UserRegister.service";

const userService = new UserService();

//TODO: ВТОРОСТЕПЕННОЕ: сделать месседж бокс и перенос на главную страницу
export default function ForgotPasswordLayout() {

    const { register, handleSubmit, formState: {errors} } = useForm({
        mode: 'onChange',
        resolver: zodResolver(ForgotPassowrdSchema)
    });

    const { mutate } = useMutation({
        mutationFn: (data: ForgotPassowrd) => userService.forgotPassowrd(data),
        onSuccess: () => {
            console.debug('SUCCESS SENDED')
        },
        onError: (err: any) => {
            console.error('error: ', err);
        },
    })

    const onSubmit: SubmitHandler<ForgotPassowrd> = (data: ForgotPassowrd) => {
        console.debug('DATA ON SUBMIT: ', data);

        mutate(data);
    }

    return (
        <>
            <form 
                className={styles['form-shell']} 
                onSubmit={handleSubmit(onSubmit)}
            >
                <InputField 
                    placeholder="example@example.com"
                    type="email"
                    title="Email"
                    isRequired={true}
                    isError={!!errors.email}
                    errorText={typeof errors.email?.message === 'string' ? errors.email.message : ''}
                    {...register('email')}
                />
                <Button 
                    variant='branded'
                    width={100}
                    height={6}
                    type='submit'
                >
                    <span style={{fontSize:'1.15rem', color:"#FFFFFF"}}>Send Key</span>
                </Button>
            </form>
        </>
    );
  }