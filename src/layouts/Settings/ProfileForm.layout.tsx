import Button from "../../components/Button/Button.component";
import InputField from "../../components/Input/Input.component";
import styles from "./style.module.scss";

export default function ProfileFormLayout() {
    return (
        <>
            <form className={styles["form"]}>
                <InputField 
                    placeholder="DequElite"
                    type="text"
                    title={'Username'}
                    isRequired={true}
                    isError={false}
                    errorText={''}
                />
                <InputField 
                    placeholder="example@example.com"
                    type="email"
                    title={'Email'}
                    isRequired={true}
                    isError={false}
                    errorText={''}
                />
                <Button 
                    variant='branded'
                    width={100}
                    height={6}
                    type='submit'
                    disabled={false}
                >
                    <span style={{fontSize:'1.15rem', color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'10px'}}>
                        <img src="/svg/Save.svg" alt="" /> 
                        Save
                    </span>
                </Button>
            </form>
        </>
    )
}