'use client'

import Button from "../Button/Button.component";
import styles from "./style.module.scss";
import { OmmaCardsProps } from "../../api/types/props.types";
import { useRouter } from "next/navigation";

export default function OmmaCard(props: OmmaCardsProps){
    const router = useRouter();

    const handleClick = () => {
        router.push(props.link);
    }

    return (
        <article 
            className={styles['card']} 
            style={{
                width: `${props.width}%`, 
                height: `${props.height}%`,
                ...props.style
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