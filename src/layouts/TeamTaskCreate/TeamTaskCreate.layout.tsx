import { Navigate, useNavigate } from '@tanstack/react-router';
import styles from './styles.module.scss';
import DefaultTaskForm from './DefaultTaskForm.form';
import SubtaskedTaskForm from './SubtaskedTaskForm.form';

export default function TeamTaskCreateLayout({
  teamId,
  taskType,
}: {
  teamId: string;
  taskType: string;
}) {    
    const navigate = useNavigate();

  if (taskType !== 'default' && taskType !== 'subtasks') {
    return <Navigate to={'/'}/>;
  }

  return (
    <main className={styles.layout}>
      {taskType === 'default' && (
        <DefaultTaskForm teamId={teamId} />
      )}
      {taskType === 'subtasks' && (
        <SubtaskedTaskForm teamId={teamId}/>
      )}
    </main>
  );
}
