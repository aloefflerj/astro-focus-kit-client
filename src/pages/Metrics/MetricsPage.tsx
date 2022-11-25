import { DashboardLayoutPage } from '../DashboardLayoutPage';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { useTasksApi } from '../../services/tasks/useTasksApi';

import style from './MetricsPage.module.scss';
import { currentWeekDays } from '../../common/utils/currentWeekDays';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useState } from 'react';
import { ITask } from '../../common/types';
import { Chart } from '../../components/Charts/Chart';
import { useTaskChartsService } from '../../services/tasks/useTaskChartsService';

const weekColors = [
    '#6A6A89',
    '#7483d0',
    '#AAB3E1',
    '#D5D9EC',
    '#f09a82',
    '#F1B08B',
    '#E8CDAE',
    '#F0C8AC',
    '#94CEA7',
    '#B5DCC2',
    '#85C69A',
    '#659875',
    '#6A6A89',
    '#7483d0',
    '#AAB3E1',
    '#D5D9EC',
    '#f09a82',
    '#F1B08B',
    '#E8CDAE',
    '#F0C8AC',
    '#94CEA7',
    '#B5DCC2',
    '#85C69A',
    '#659875',
];

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
                                colors={weekColors}
                                data={productiveWeekDay}
                            />
                            <Chart
                                titleContent={'Most Productive Hours'}
                                colors={weekColors}
                                data={productiveHours}
                            />
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayoutPage>
    );
}
