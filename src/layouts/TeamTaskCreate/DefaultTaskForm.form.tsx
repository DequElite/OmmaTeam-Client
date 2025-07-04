import TextArea from '../../components/TextArea/TextArea.component';
import styles from './styles.module.scss';
import TaskSettingsLayout from './TaskSettings.layout';

export default function DefaultTaskForm({teamId}:{teamId: string}){
    return (
        <>
            <div className={styles['editor-layout']}>
                <section className={styles['editor__details']}>
                    <div className={styles['editor__details-desc']}>
                        <TextArea 
                            title='Task Description'
                            isRequired={true}
                            isError={false}
                            errorText=''
                        />
                    </div>
                </section>
                <section className={styles['editor__info']}>
                    <TaskSettingsLayout />
                </section>
            </div>
        </>
    )
}