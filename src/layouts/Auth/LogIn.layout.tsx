import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/Button/Button.component";
import InputField from "../../components/Input/Input.component";
import styles from "./style.module.scss";
import { LogIn } from "../../api/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInSchema } from "../../api/schemas-validate/register.schema";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../api/services/UserRegister.service";
import { SetAccessToken } from "../../utils/getTokenFromLocalStorage.util";
import { Link, useNavigate } from "@tanstack/react-router";
import { getUserProfile } from "../../store/services/userProfile.service";
import { useAppDispatch } from "../../store/store";
import PasswordInput from "../../components/Input/PasswordInput.component";
import { useMessageBox } from "../../contexts/MessageBoxContext/useMessageBox";

const userService = new UserService();

export default function LogInLayout() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { updateState } = useMessageBox();

    const { register, handleSubmit, formState: {errors} } = useForm<LogIn>({
        mode: 'onChange',
        resolver: zodResolver(logInSchema)
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data:LogIn) => userService.logIn(data),
        onSuccess: async (data: any) => {
            await SetAccessToken(data.data.accessToken);

            await dispatch(getUserProfile());

            updateState({
                isOpened: true,
                type: 'success',
                desc: 'LogIn successful!'
            });

            navigate({ to: '/' });
        },
        onError: (err: any) => {
            console.error('error: ', err);

            switch(err.status) {
                case 401:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Invalid password!'
                    });
                    break;
                case 404:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'User not found ☹️'
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

    const onSubmit: SubmitHandler<LogIn> = (data: LogIn) => mutate(data);

    const signByGoogle = () => window.location.href = userService.googleSign();

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
                {/* <InputField 
                    placeholder="Strong Password"
                    type="password"
                    title="Password"
                    isRequired={true}
                    isError={!!errors.password}
                    errorText={typeof errors.password?.message === 'string' ? errors.password.message : ''}
                    {...register('password')}
                /> */}
                <PasswordInput 
                    placeholder="Strong Password"
                    title="Password"
                    isRequired={true}
                    isError={!!errors.password}
                    errorText={typeof errors.password?.message === 'string' ? errors.password.message : ''}
                    {...register('password')}
                />

                <div className={styles['form-shell__forgot-password']}>
                  <Link to="../forgot-password">
                    Forgot Passoword?
                  </Link>
                </div>

                <Button 
                    variant='branded'
                    width={100}
                    height={6}
                    type='submit'
                    disabled={isPending}
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
                    onClick={signByGoogle}
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