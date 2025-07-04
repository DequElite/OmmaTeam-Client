import InputField from '../../components/Input/Input.component';
import Select from '../../components/Select/Select.component';
import styles from './styles.module.scss';

export default function TaskSettingsLayout(){
    return (
        <>
            <div className={styles['settings-layout']}>
                <form className={styles['form']}>
                    <InputField 
                        type='text'
                        title='Task name'
                        isRequired={true}
                        isError={false}
                        errorText=''
                        placeholder='Enter task name'
                    />
                    <InputField 
                        type='date'
                        title='Task name'
                        isRequired={true}
                        isError={false}
                        errorText=''
                        placeholder='Enter deadline'
                    />
                    <Select 
                        title='Task type'
                        name='task_type'
                        isRequired={true}
                        options={[{value:'ff', label:'babel'}, {value:'ff', label:'babel'},{value:'ff', label:'babel'},{value:'ff', label:'babel'},{value:'ff', label:'babel'},{value:'ff', label:'babel'},{value:'ff', label:'babel'}]}
                    />
                    <Select 
                        title='Task difficulty'
                        name='task_type'
                        isRequired={true}
                        options={[{value:'ff', label:'babel'}, {value:'ff', label:'babel'},{value:'ff', label:'babel'},{value:'ff', label:'babel'},{value:'ff', label:'babel'},{value:'ff', label:'babel'},{value:'ff', label:'babel'}]}
                    />
                    <Select 
                        title='Task responsible'
                        name='task_type'
                        isRequired={true}
                        options={[{value:'ff', label:'babel'}, {value:'ff', label:'babel'},{value:'ff', label:'babel'},{value:'ff', label:'babel'},{value:'ff', label:'babel'},{value:'ff', label:'babel'},{value:'ff', label:'babel'}]}
                    />
                </form>
            </div>
        </>
    )
}