import { Navigate } from '@tanstack/react-router';
import styles from './styles.module.scss';
import DefaultTaskForm from './DefaultTaskForm.form';
import SubtaskedTaskForm from './SubtaskedTaskForm.form';
import { TeamDataType } from '../../api/types/team.types';
import WindowLoading from '../../components/Loading/WindowLoading.component';

export default function TaskTaskCreateLayout({
  teamId,
  taskType,
  teamData,
}: {
  teamId: string;
  taskType: string;
  teamData: TeamDataType | undefined;
}) {    
  if (!teamData) return <WindowLoading />;

  if (taskType !== 'default' && taskType !== 'subtasks') {
    return <Navigate to={`/team/${teamId}/leader/task?type=default`}/>;
  }

  return (
    <main className={styles.layout}>
      {taskType === 'default' && (
        <DefaultTaskForm
          teamData={teamData}
        />
      )}
      {taskType === 'subtasks' && (
        <SubtaskedTaskForm teamData={teamData}/>
      )}
    </main>
  );
}
