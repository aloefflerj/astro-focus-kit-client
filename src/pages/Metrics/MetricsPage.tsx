import { DashboardLayoutPage } from '../DashboardLayoutPage';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { useTasksApi } from '../../services/tasks/useTasksApi';

import style from './MetricsPage.module.scss';
import { currentWeekDays } from '../../common/utils/currentWeekDays';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ITask } from '../../common/types';
import { Chart } from '../../components/Charts/Chart';
import { useTaskChartsService } from '../../services/tasks/useTaskChartsService';

export function MetricsPage() {
    const { getTasks } = useTasksApi();
    const weekDays = currentWeekDays();
    const { handleMostProductiveWeekDays, handleMostProductiveHours } =
        useTaskChartsService();

    const [productiveWeekDay, setProductiveWeekDay] = useState<
        { name: string; value: number }[]
    >([]);

    const [productiveHours, setProductiveHours] = useState<
        { name: string; value: number }[]
    >([]);

    const onSuccess = (queriedTasks: ITask[]) => {
        const productiveWeekDaysData = handleMostProductiveWeekDays(
            queriedTasks,
            weekDays
        );
        setProductiveWeekDay(productiveWeekDaysData);

        const productiveHoursData = handleMostProductiveHours(queriedTasks);
        setProductiveHours(productiveHoursData);
    };

    const { isFetching: isFetchingTasks } = useQuery<ITask[]>(
        ['tasks'],
        async () => getTasks(),
        { onSuccess, refetchOnWindowFocus: false }
    );

    const data = weekDays.map(({ weekDay }) => {
        return { name: weekDay, value: 100 };
    });

    return (
        <DashboardLayoutPage>
            <div className={style.metricsPage}>
                <div className={style.metricsContent}>
                    <h1>Metrics</h1>
                    {!isFetchingTasks && (
                        <div className={style.chartsContent}>
                            <Chart
                                titleContent={'Most Productive Weekday'}
                                data={productiveWeekDay}
                            />
                            <Chart
                                titleContent={'Most Productive Hours'}
                                data={productiveHours}
                            />
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayoutPage>
    );
}
