import { signUpSchema } from "../../api/schemas-validate/register.schema";
import Button from "../../components/Button/Button.component";
import InputField from "../../components/Input/Input.component";
import styles from "./style.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUp, UsersRoles } from "../../api/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../api/services/UserRegister.service";
import { useNavigate } from "@tanstack/react-router";
import { SetAccessToken } from "../../utils/getTokenFromLocalStorage.util";
import { useAppDispatch } from "../../store/store";
import { getUserProfile } from "../../store/services/userProfile.service";
import PasswordInput from "../../components/Input/PasswordInput.component";
import { useMessageBox } from "../../contexts/MessageBoxContext/useMessageBox";
import { useTranslation } from "react-i18next";

const userService = new UserService();

export default function SignUpLayout() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { updateState } = useMessageBox();
    const { t } = useTranslation();
    const fields = t('forms.SignUp.fields', { returnObjects: true }) as string[];

    const { register, handleSubmit, formState: {errors} } = useForm<SignUp>({
        mode:'onChange',
        resolver: zodResolver(signUpSchema)
    });

    const {mutate, isPending} = useMutation({
        mutationFn: (data: SignUp) => userService.signUp(data),
        onSuccess: async (data: any) => {
            await SetAccessToken(data.data.accessToken);   

            await dispatch(getUserProfile());

            updateState({
                isOpened: true,
                type: 'success',
                desc: 'Registration successful!'
            });

            navigate({ to:'/', replace: true  })
        },
        onError: (err: any) => {
            console.error('error: ', err);

            switch(err.status) {
                case 400:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'User already exist, try to login'
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
    })

    const onSubmit: SubmitHandler<SignUp> = (data: SignUp) => {

        mutate({
            ...data,
            role: UsersRoles.User
        });
    };

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
                    title={fields[0]}
                    isRequired={true}
                    isError={!!errors.email}
                    errorText={typeof errors.email?.message === 'string' ? errors.email.message : ''}
                    {...register('email')}
                />

                <InputField 
                    placeholder="Your username"
                    type="text"
                    title={fields[1]}
                    isRequired={true}
                    isError={!!errors.username}
                    errorText={typeof errors.username?.message === 'string' ? errors.username.message : ''}
                    {...register('username')}
                />

                <PasswordInput 
                    placeholder="Strong Password"
                    title={fields[2]}
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
                    disabled={isPending}
                >
                    <span style={{fontSize:'1.15rem', color:"#FFFFFF"}}>
                        {
                            t("buttons.SignUp")
                        }
                    </span>
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
                        <span style={{fontSize:'1.15rem', color:"#FFFFFF"}}>
                            {
                                t("buttons.GoogleSign")
                            }
                        </span>
                    </div>
                </Button>
            </form>
        </>
    );
  }