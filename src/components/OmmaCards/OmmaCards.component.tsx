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
    return (
        <article 
            className={styles['card']} 
            style={{
                width: `${props.width}%`, 
                height: `${props.height}vh`
            }}
        >
            <img src={props.iconPath} alt="Card icon" className={styles['card__img']}/>
            <h4 className={styles['card__title']}>
                {props.title}
            </h4>
            <p className={styles['card__desc']}>
                {props.desc}
            </p>
            <Button variant='branded' width={100} height={5}>
                <span>{props.buttonText}</span>
            </Button>
        </article>
    )
}