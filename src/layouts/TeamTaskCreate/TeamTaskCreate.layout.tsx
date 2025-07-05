import { Navigate, useNavigate } from '@tanstack/react-router';
import styles from './styles.module.scss';
import DefaultTaskForm from './DefaultTaskForm.form';
import SubtaskedTaskForm from './SubtaskedTaskForm.form';
import { TeamDataType } from '../../api/types/team.types';
import WindowLoading from '../../components/Loading/WindowLoading.component';
import { SubmitHandler } from 'react-hook-form';
import { CreateTaskType } from '../../api/types/tasks.types';

export default function TaskTaskCreateLayout({
  teamId,
  taskType,
  teamData,
  formId,
}: {
  teamId: string;
  taskType: string;
  teamData: TeamDataType | undefined;
  formId: string;
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
          formId={formId}
        />
      )}
      {taskType === 'subtasks' && (
        <SubtaskedTaskForm teamData={teamData}/>
      )}
    </main>
  );
}
