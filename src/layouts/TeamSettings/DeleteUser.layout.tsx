import Button from "../../components/Button/Button.component";
import InputField from "../../components/Input/Input.component";
import styles from "./style.module.scss";

export default function DeleteUserLayout({teamId}:{teamId: string}){
    return (
        <form className={styles['form']}>
            <header className={styles['form__header']}>
                <h3>
                    Delete user from team
                </h3>
            </header>
            <InputField 
                placeholder="For Example: dexTeam"
                type="email"
                title='Teammate email'
                isRequired={true}
                isError={false}
                errorText={''}
            />
            <Button 
                variant='branded'
                width={100}
                height={6}
                type='submit'
            >
                <span style={{fontSize:'1.15rem', color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'10px'}}>
                    <img src="/svg/Delete.svg" alt="" /> 
                    Delete teammate
                </span>
            </Button>
        </form>
    )
}