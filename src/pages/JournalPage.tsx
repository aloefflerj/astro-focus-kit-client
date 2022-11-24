import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useState } from 'react';
import { ITask } from '../common/types';
import { getWeekTitleFromTaskDay } from '../common/utils/getWeekTitleFromTaskDay';
import { Card } from '../components/Card/Card';
import { Timeline } from '../components/Timeline/Timeline';
import { TimelineElement } from '../components/Timeline/TimelineElement';
import { useTasksApi } from '../services/tasks/useTasksApi';
import { DashboardLayoutPage } from './DashboardLayoutPage';

export function JournalPage() {
    const [showDetails, setShowDetails] = useState(false);
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

    const getFinishedTasksQty = (week: string): number =>
        tasks.filter(task => {
            return (
                getWeekTitleFromTaskDay(task) === week && task.status === 'done'
            );
        }).length;

    const getUnfinishedTasksQty = (week: string): number =>
        tasks.filter(task => {
            return (
                getWeekTitleFromTaskDay(task) === week && task.status !== 'done'
            );
        }).length;

    return (
        <DashboardLayoutPage loading={isFetchingTasks}>
            <h1>Your Tasks by Week</h1>
            <Timeline>
                {weeks.map((week, index) => (
                    <TimelineElement
                        setShowDetails={setShowDetails}
                        key={index}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center'}}>{week}</span>
                            {showDetails && (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <span style={{ paddingLeft: '12px' }}>
                                        Finished tasks:{' '}
                                        {getFinishedTasksQty(week)}
                                    </span>
                                    <span style={{ paddingLeft: '12px' }}>
                                        Unfinished tasks:{' '}
                                        {getUnfinishedTasksQty(week)}
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
