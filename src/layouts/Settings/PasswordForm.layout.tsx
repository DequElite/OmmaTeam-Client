import { Link } from "@tanstack/react-router";
import Button from "../../components/Button/Button.component";
import PasswordInput from "../../components/Input/PasswordInput.component";
import styles from "./style.module.scss";
import { useAppSelector } from "../../store/store";
import { useMessageBox } from "../../contexts/MessageBoxContext/useMessageBox";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewPassword } from "../../api/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema } from "../../api/schemas-validate/profile.schema";
import { useMutation } from "@tanstack/react-query";
import { ProfileService } from "../../api/services/Profile.service";
import useConfirmBox from "../../contexts/ConfirmBoxContext/useConfirmBox";
import { useTranslation } from "react-i18next";

const profileService = new ProfileService();

export default function PasswordFormLayout() {
    const { updateState } = useMessageBox();
    const { confirm } = useConfirmBox();

    const { t } = useTranslation();

    const userProfileData = useAppSelector(state => state.userProfile);
    
    const { register, handleSubmit, formState: {errors} } = useForm<NewPassword>({
        mode:'onChange',
        resolver: zodResolver(newPasswordSchema)
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: NewPassword) => profileService.changePassword(data),
        onSuccess: () => {
            console.debug('SUCCESS SENDED')

            updateState({
                isOpened: true,
                type: 'success',
                desc: 'Password changed successful'
            });
        },
        onError: (err: any) => {
            console.error('error: ', err);

            switch(err.status) {
                case 400:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Missign password fields'
                    });
                    break;
                case 401:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Invalid old password'
                    });
                    break;
                case 404:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'User not found'
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

    const onSubmit: SubmitHandler<NewPassword> = async (data: NewPassword) => {
        console.debug('DATA ON SUBMIT: ', data);

        if(confirm){
            const result = await confirm("You are going to change your password");
            if(result){
                mutate(data);
            } else {
                updateState({
                    isOpened: true,
                    type: 'info',
                    desc: 'Nothing has been changed'
                });
            }
        }
        // mutate(data);
    }

    return (
        <>
            <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
                <PasswordInput 
                    placeholder="Old Password"
                    title={'Old'}
                    isRequired={true}
                    isError={!!errors.oldPassword}
                    errorText={typeof errors.oldPassword?.message === 'string' ? errors.oldPassword.message : ''}
                    {...register('oldPassword')}
                />
                <PasswordInput 
                    placeholder="New password"
                    title={'New Password'}
                    isRequired={true}
                    isError={!!errors.password}
                    errorText={typeof errors.password?.message === 'string' ? errors.password.message : ''}
                    {...register('password')}
                />
                <div className={styles['forgot-password']}>
                    <Link to={`/auth/forgot-password?email=${userProfileData.email}`}>
                        Forgot Password?
                    </Link>
                </div>
                <Button 
                    variant='branded'
                    width={100}
                    height={6}
                    type='submit'
                    disabled={isPending}
                >
                    <span style={{fontSize:'1.15rem', color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'10px'}}>
                        <img src="/svg/Change.svg" alt="" /> 
                        {t('buttons.ChangePassword')}
                    </span>
                </Button>
            </form>
        </>
    )
}