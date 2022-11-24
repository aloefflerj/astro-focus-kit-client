import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useState } from 'react';
import { ITask } from '../../common/types';
import { getWeekTitleFromTaskDay } from '../../common/utils/getWeekTitleFromTaskDay';
import { Timeline } from '../../components/Timeline/Timeline';
import { TimelineElement } from '../../components/Timeline/TimelineElement';
import { useTasksApi } from '../../services/tasks/useTasksApi';
import { DashboardLayoutPage } from '../DashboardLayoutPage';
import style from './JournalPage.module.scss';

export function JournalPage() {
    const [elementVisibleByIndex, setElementVisibleByIndex] = useState<number | null>(null);
    const { getTasks } = useTasksApi();
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [weeks, setWeeks] = useState<string[]>([]);

    const onSuccess = (queriedTasks: ITask[]) => {
        setWeeks(
            queriedTasks
                .map(task => {
                    return getWeekTitleFromTaskDay(task);
                })
                .filter((value, index, self) => self.indexOf(value) === index)
        );

        setTasks(
            queriedTasks.map(task => {
                task.registerDate = moment(task.registerDate).format(
                    'YYYY/MM/DD'
                );
                return task;
            })
        );
    };

    const { isFetching: isFetchingTasks } = useQuery<ITask[]>(
        ['tasks'],
        async () => getTasks(),
        { onSuccess, refetchOnWindowFocus: false }
    );

    const getFinishedTasks = (week: string): ITask[] =>
        tasks.filter(task => {
            return (
                getWeekTitleFromTaskDay(task) === week && task.status === 'done'
            );
        });

    const getUnfinishedTasks = (week: string): ITask[] =>
        tasks.filter(task => {
            return (
                getWeekTitleFromTaskDay(task) === week && task.status !== 'done'
            );
        });

    return (
        <DashboardLayoutPage loading={isFetchingTasks}>
            <h1>Your Tasks by Week</h1>
            <Timeline>
                {weeks.map((week, index) => (
                    <TimelineElement
                        setElementVisibleByIndex={setElementVisibleByIndex}
                        key={index}
                        index={index}
                        finishedTasks={getFinishedTasks(week)}
                        unfinishedTasks={getUnfinishedTasks(week)}
                    >
                        <div className={style.cardContent}>
                            <span className={style.weekTitle}>{week}</span>
                            {index === elementVisibleByIndex && (
                                <div className={style.tasksStatusWrapper}>
                                    <span className={style.tasksStatus}>
                                        Finished tasks:{' '}
                                        {getFinishedTasks(week).length}
                                    </span>
                                    <span className={style.tasksStatus}>
                                        Unfinished tasks:{' '}
                                        {getUnfinishedTasks(week).length}
                                    </span>
                                </div>
                            )}
                        </div>
                    </TimelineElement>
                ))}
            </Timeline>
        </DashboardLayoutPage>
    );
}
