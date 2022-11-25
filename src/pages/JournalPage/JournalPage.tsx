import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useState } from 'react';
import { IReason, ITask } from '../../common/types';
import {
    getWeekTitleFromReasonDay,
    getWeekTitleFromTaskDay,
} from '../../common/utils/getWeekTitleFromTaskDay';
import { Timeline } from '../../components/Timeline/Timeline';
import { TimelineReasonsElement } from '../../components/Timeline/TimelineReasonsElement';
import { TimelineTasksElement } from '../../components/Timeline/TimelineTasksElement';
import { useReasonsApi } from '../../services/reasons/useReasonsApi';
import { useTasksApi } from '../../services/tasks/useTasksApi';
import { DashboardLayoutPage } from '../DashboardLayoutPage';
import style from './JournalPage.module.scss';

export function JournalPage() {
    const [elementVisibleByIndex, setElementVisibleByIndex] = useState<
        string | null
    >(null);
    const { getTasks } = useTasksApi();
    const { getReasons } = useReasonsApi();

    const [tasks, setTasks] = useState<ITask[]>([]);
    const [weeks, setWeeks] = useState<string[]>([]);

    const [reasons, setReasons] = useState<IReason[]>([]);
    const [reasonsWeeks, setReasonsWeeks] = useState<string[]>([]);

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

    const onSuccessReasons = (queriedReasons: IReason[]) => {
        setReasonsWeeks(
            queriedReasons
                .map(reason => {
                    return getWeekTitleFromReasonDay(reason);
                })
                .filter((value, index, self) => self.indexOf(value) === index)
        );

        setReasons(
            queriedReasons.map(reason => {
                reason.reasonDateTime = moment(reason.reasonDateTime).format(
                    'YYYY/MM/DD'
                );
                return reason;
            })
        );
    };

    const { isFetching: isFetchingTasks } = useQuery<ITask[]>(
        ['tasks'],
        async () => getTasks(),
        { onSuccess, refetchOnWindowFocus: false }
    );

    const { isFetching: isFetchingReasons } = useQuery<IReason[]>(
        ['reasons'],
        async () => getReasons(),
        { onSuccess: onSuccessReasons, refetchOnWindowFocus: false }
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

    const getReasonsByWeek = (week: string): IReason[] =>
        reasons.filter(reason => {
            return getWeekTitleFromReasonDay(reason) === week;
        });

    return (
        <DashboardLayoutPage loading={isFetchingTasks && isFetchingReasons}>
            <h1>Your Journal by Week</h1>
            <div style={{ display: 'flex' }}>
                <h2>Tasks</h2>
                <Timeline>
                    {weeks.map((week, index) => (
                        <TimelineTasksElement
                            setElementVisibleByIndex={setElementVisibleByIndex}
                            key={`tasks-${index}`}
                            index={`tasks-${index}`}
                            finishedTasks={getFinishedTasks(week)}
                            unfinishedTasks={getUnfinishedTasks(week)}
                        >
                            <div className={style.cardContent}>
                                <span className={style.weekTitle}>{week}</span>
                                {`tasks-${index}` === elementVisibleByIndex && (
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
                        </TimelineTasksElement>
                    ))}
                </Timeline>
                <h2>Reasons</h2>
                <Timeline>
                    {reasonsWeeks.map((week, index) => (
                        <TimelineReasonsElement
                            setElementVisibleByIndex={setElementVisibleByIndex}
                            key={`reasons-${index}`}
                            index={`reasons-${index}`}
                            reasons={getReasonsByWeek(week)}
                        >
                            <div className={style.cardContent}>
                                <span className={style.weekTitle}>{week}</span>
                                {`reasons-${index}` ===
                                    elementVisibleByIndex && (
                                    <div className={style.reasonsStatusWrapper}>
                                        <span className={style.tasksStatus}>
                                            Reasons to Procrastinate: {getReasonsByWeek(week).length}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </TimelineReasonsElement>
                    ))}
                </Timeline>
            </div>
        </DashboardLayoutPage>
    );
}
