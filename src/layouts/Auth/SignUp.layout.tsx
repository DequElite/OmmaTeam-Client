import Button from "../../components/Button/Button.component";
import InputField from "../../components/Input/Input.component";
import styles from "./style.module.scss";

export default function SignUpLayout() {
    return (
        <>
            <InputField 
                placeholder="example@example.com"
                type="email"
                name="email"
                title="Email"
                isRequired={true}
                isError={false}
                errorText=""
            />
            <InputField 
                placeholder="Your name"
                type="text"
                name="name"
                title="Name"
                isRequired={true}
                isError={false}
                errorText=""
            />
            <InputField 
                placeholder="Strong Password"
                type="password"
                name="password"
                title="Password"
                isRequired={true}
                isError={false}
                errorText=""
            />

            {/* 
                //TODO: доделать кнопки как в макете фигма 
                //TODO: сделай REACT HOOK FORM валидацию
            */}
            <Button 
                variant='branded'
                width={100}
                height={6}
                onClick={()=>{console.log("clicked")}}
            >
                <span style={{fontSize:'1.2rem', color:"#FFFFFF"}}>Sign Up</span>
            </Button>
        </>
    );
  }