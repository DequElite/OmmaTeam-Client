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

const userService = new UserService();

//TODO: ВТОРОСТЕПЕННОЕ: сделать месседж бокс и перенос на главную страницу
export default function SignUpLayout() {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: {errors} } = useForm<SignUp>({
        mode:'onChange',
        resolver: zodResolver(signUpSchema)
    });

    const {mutate} = useMutation({
        mutationFn: (data: SignUp) => userService.signUp(data),
        onSuccess: async (data: any) => {
            console.debug('SUCCESS: ', data.data);
            SetAccessToken(data.data.accessToken);   

            await dispatch(getUserProfile());

            navigate({ to:'/' })
        },
        onError: (err: any) => {
            console.error('error: ', err);
        },
    })


    const onSubmit: SubmitHandler<SignUp> = (data: SignUp) => {
        console.debug('DATA ON SUBMIT: ', data);

        mutate({
            ...data,
            role: UsersRoles.User
        });
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

                <InputField 
                    placeholder="Your username"
                    type="text"
                    title="Username"
                    isRequired={true}
                    isError={!!errors.username}
                    errorText={typeof errors.username?.message === 'string' ? errors.username.message : ''}
                    {...register('username')}
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
                    <span style={{fontSize:'1.15rem', color:"#FFFFFF"}}>Sign Up</span>
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