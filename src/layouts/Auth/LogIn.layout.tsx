import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/Button/Button.component";
import InputField from "../../components/Input/Input.component";
import styles from "./style.module.scss";
import { LogIn } from "../../api/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInSchema } from "../../api/schemas-validate/register.schema";

export default function LogInLayout() {
    const { register, handleSubmit, formState: {errors} } = useForm<LogIn>({
        mode: 'onChange',
        resolver: zodResolver(logInSchema)
    });

    const onSubmit: SubmitHandler<LogIn> = (data: LogIn) => {
        console.debug('DATA ON SUBMIT: ', data);
    }

    //todo: доделай логин. добавь useMutation

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
                <InputField 
                    placeholder="Strong Password"
                    type="password"
                    title="Password"
                    isRequired={true}
                    isError={!!errors.password}
                    errorText={typeof errors.password?.message === 'string' ? errors.password.message : ''}
                    {...register('password')}
                />
                <Button 
                    variant='branded'
                    width={100}
                    height={6}
                    type='submit'
                >
                    <span style={{fontSize:'1.15rem', color:"#FFFFFF"}}>Log In</span>
                </Button>
                <div className={styles['form-shell__or']}>
                    <div className={styles['or-line']}></div>
                    <span className={styles['or-text']}>OR</span>
                </div>
                <Button 
                    variant='branded-reverese'
                    width={100}
                    height={6}
                    onClick={()=>{console.log("clicked")}}
                >
                    <div className={styles['button-google']}>
                        <img src="/icons/GoogleIcon.png" alt="Google logo Icon"/>
                        <span style={{fontSize:'1.15rem', color:"#FFFFFF"}}>Log In by Google</span>
                    </div>
                </Button>
            </form>
        </>
    );
  }