import Button from "../../components/Button/Button.component";
import InputField from "../../components/Input/Input.component";
import styles from "./style.module.scss";

export default function ChangeTeamNameLayout({teamId}:{teamId: string}){
    return (
        <form className={styles['form']}>
            <header className={styles['form__header']}>
                <h3>
                    Team name
                </h3>
            </header>
            <InputField 
                placeholder="For Example: dexTeam"
                type="text"
                title='New team name'
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
                    <img src="/svg/Change.svg" alt="" /> 
                    Change name
                </span>
            </Button>
        </form>
    )
}