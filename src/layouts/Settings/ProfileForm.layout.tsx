import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../components/Button/Button.component";
import InputField from "../../components/Input/Input.component";
import { useMessageBox } from "../../contexts/MessageBoxContext/useMessageBox";
import { useAppDispatch, useAppSelector } from "../../store/store";
import styles from "./style.module.scss";
import { ChangeProfileData } from "../../api/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeProfileDataSchema } from "../../api/schemas-validate/profile.schema";
import { useMutation } from "@tanstack/react-query";
import { ProfileService } from "../../api/services/Profile.service";
import { SetAccessToken } from "../../utils/getTokenFromLocalStorage.util";
import { getUserProfile } from "../../store/services/userProfile.service";
import useConfirmBox from "../../contexts/ConfirmBoxContext/useConfirmBox";
import { useTranslation } from "react-i18next";

const profileService = new ProfileService();

export default function ProfileFormLayout() {
    const { updateState } = useMessageBox();
    const { confirm } = useConfirmBox();

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const userProfileData = useAppSelector(state => state.userProfile);

    const { register, handleSubmit, formState: { errors } } = useForm<ChangeProfileData>({
        mode: 'onChange',
        resolver: zodResolver(changeProfileDataSchema),
        defaultValues: {
            email: userProfileData.email,
            username: userProfileData.username
        }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data:  ChangeProfileData) => profileService.changeProfile(data),
        onSuccess: async (data: any) => {
            console.debug('SUCCESS SENDED');

            await SetAccessToken(data.data.accessToken);

            await dispatch(getUserProfile());

            updateState({
                isOpened: true,
                type: 'success',
                desc: 'Profile data changed successful'
            });
        },
        onError: (err: any) => {
            console.error('error: ', err);

            switch(err.status) {
                case 400:
                    updateState({
                        isOpened: true,
                        type: 'error',
                        desc: 'Missing data fields'
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
    })

    const onSubmit: SubmitHandler<ChangeProfileData> = async (data:ChangeProfileData) => {
        console.debug('DATA ON  SUBMIT: ', data);
    
        if(confirm){
            const result = await confirm("You are going to change your profile data");
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
    }

    return (
        <>
            <form className={styles["form"]}  onSubmit={handleSubmit(onSubmit)}>
                <InputField 
                    placeholder="DequElite"
                    type="text"
                    title={'Username'}
                    isRequired={true}
                    isError={!!errors.username}
                    errorText={typeof errors.username?.message === 'string' ? errors.username.message : ''}
                    {...register('username')}
                />
                <InputField 
                    placeholder="example@example.com"
                    type="email"
                    title={'Email'}
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
                    disabled={isPending}
                >
                    <span style={{fontSize:'1.15rem', color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'10px'}}>
                        <img src="/svg/Save.svg" alt="" /> 
                        {t('buttons.Save')}
                    </span>
                </Button>
            </form>
        </>
    )
}