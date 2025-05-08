import { useNavigate } from "@tanstack/react-router";
import Button from "../Button/Button.component";
import styles from "./style.module.scss";

interface OmmaCardsProps {
    iconPath: string;
    title: string;
    desc: string;
    buttonText: string;
    link: string;
    width: number;
    height: number;
}

export default function OmmaCard(props: OmmaCardsProps){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate({ to: props.link });
    }

    return (
        <article 
            className={styles['card']} 
            style={{
                width: `${props.width}%`, 
                height: `${props.height}%`
            }}
        >
            <img src={props.iconPath} alt="Card icon" className={styles['card__img']}/>
            <h4 className={styles['card__title']}>
                {props.title}
            </h4>
            <p className={styles['card__desc']}>
                {props.desc}
            </p>
            <Button variant='branded' width={90} height={7} onClick={handleClick}>
                <strong>
                    <span style={{fontSize: '1.3rem', color:'#FFFFFF'}}>
                        {props.buttonText}
                    </span>
                </strong>
            </Button>
        </article>
    )
}