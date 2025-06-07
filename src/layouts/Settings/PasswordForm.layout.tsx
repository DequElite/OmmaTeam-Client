import { Link } from "@tanstack/react-router";
import Button from "../../components/Button/Button.component";
import InputField from "../../components/Input/Input.component";
import PasswordInput from "../../components/Input/PasswordInput.component";
import styles from "./style.module.scss";

export default function PasswordFormLayout() {
    return (
        <>
            <form className={styles["form"]}>
                <PasswordInput 
                    placeholder="Old Password"
                    title={'Old'}
                    isRequired={true}
                    isError={false}
                    errorText={''}
                />
                <PasswordInput 
                    placeholder="New password"
                    title={'Email'}
                    isRequired={true}
                    isError={false}
                    errorText={''}
                />
                <div className={styles['forgot-password']}>
                  <Link to="../forgot-password">
                    Forgot Password?
                  </Link>
                </div>
                <Button 
                    variant='branded'
                    width={100}
                    height={6}
                    type='submit'
                    disabled={false}
                >
                    <span style={{fontSize:'1.15rem', color:"#FFFFFF", display:'flex', justifyContent:'center', alignItems: 'center', gap:'10px'}}>
                        <img src="/svg/Change.svg" alt="" /> 
                        Change password
                    </span>
                </Button>
            </form>
        </>
    )
}