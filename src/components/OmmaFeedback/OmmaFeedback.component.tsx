import { FeedbackRates } from "../../api/types/moderation.types";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.util";
import Responsible from "../Responsible/Responsible.component";
import styles from './style.module.scss';

interface OmmaFeedbackProps {
    username: string;
    rate: FeedbackRates;
    desc: string;
    width?: number;
    height?: number;
    style?: any;
}

function Rates({rate}:{rate: FeedbackRates}) {
    return (
        <div className={`${styles['rate']} ${styles[rate.toLocaleLowerCase()]}`}>
            {capitalizeFirstLetter(rate)}
        </div>
    )
}

export default function OmmaFeedback(props: OmmaFeedbackProps){
    return (
        <article 
            className={styles['card']} 
            style={{
                width: `${props.width}px`, 
                height: `${props.height}%`,
                flexShrink: 0,
                ...props.style
            }}
        >
            <Responsible name={props.username}/>
            <Rates rate={props.rate}/>
            <p className={styles['card__desc']}>
                {props.desc}
            </p>
        </article>
    )
}