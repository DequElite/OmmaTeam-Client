import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './style.module.scss'
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPassowrdSchema } from '../../api/schemas-validate/register.schema';
import { ResetPassword, ResetPasswordShared } from '../../api/types/user.types';
import PasswordInput from '../../components/Input/PasswordInput.component';
import Button from '../../components/Button/Button.component';
import { useMutation } from '@tanstack/react-query';
import { UserService } from '../../api/services/UserRegister.service';
import { useNavigate } from '@tanstack/react-router';
import { useMessageBox } from '../../contexts/MessageBoxContext/useMessageBox';
import { useTranslation } from 'react-i18next';

const userService = new UserService();

export default function ResetPasswordLayout({
    keyQuery
}: {keyQuery: string}) {
    const navigate = useNavigate();
    const { updateState } = useMessageBox();
    const { t } = useTranslation();

    const {register, handleSubmit, formState: {errors}} = useForm<ResetPassword>({
        mode: 'onChange',
        resolver: zodResolver(ResetPassowrdSchema)
    });

    const {mutate} = useMutation({
        mutationFn: (data: ResetPasswordShared) => userService.resetPassoword(data),
        onSuccess: () => {
            updateState({
                isOpened: true,
                type: 'success',
                desc: 'Your password was reset successfully!'
            });

            navigate({ to:'/auth/login', replace: true })
        },
        onError: (err: any) => {
            console.error('error: ', err);

            switch(err.status) {
                case 401:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Reset token expired'
                    });
                    break;
                case 404:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Reset token not found'
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

    const onSubmit: SubmitHandler<ResetPassword> = (data: ResetPassword) => {
        console.debug('SUCCESS: ', data);

        mutate({
            ...data,
            resetToken: keyQuery
        })

        //sdf5#g5yju1EDe
    }

    return (
        <>
            <form 
                className={styles['form-shell']} 
                onSubmit={handleSubmit(onSubmit)}
            >
                <PasswordInput 
                    placeholder="Strong Password"
                    title={t("forms.ResetPassword.field")}
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
                    <span style={{fontSize:'1.15rem', color:"#FFFFFF"}}>
                        {
                            t("buttons.Confirm")
                        }
                    </span>
                </Button>
            </form>
        </>
    );
}