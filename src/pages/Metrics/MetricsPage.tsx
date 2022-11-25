import { DashboardLayoutPage } from '../DashboardLayoutPage';
import { useTasksApi } from '../../services/tasks/useTasksApi';

import style from './MetricsPage.module.scss';
import { currentWeekDays } from '../../common/utils/currentWeekDays';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ITask, IReason } from '../../common/types';
import { Chart } from '../../components/Charts/Chart';
import { useTaskChartsService } from '../../services/tasks/useTaskChartsService';
import { useReasonsApi } from '../../services/reasons/useReasonsApi';
import { useRasonsChartsService } from '../../services/reasons/useRasonsChartsService';

export function MetricsPage() {
    const { getTasks } = useTasksApi();
    const { getReasons } = useReasonsApi();

    const weekDays = currentWeekDays();
    const { handleMostProductiveWeekDays, handleMostProductiveHours } =
        useTaskChartsService();

    const { handleLeastProductiveHours, handleLeastProductiveWeekDays } =
        useRasonsChartsService();

    const [productiveWeekDay, setProductiveWeekDay] = useState<
        { name: string; value: number }[]
    >([]);

    const [productiveHours, setProductiveHours] = useState<
        { name: string; value: number }[]
    >([]);

    const [unproductiveWeekDay, setunproductiveWeekDay] = useState<
        { name: string; value: number }[]
    >([]);

    const [unproductiveHours, setUnproductiveHours] = useState<
        { name: string; value: number }[]
    >([]);

    const onSuccessTasks = (queriedTasks: ITask[]) => {
        const productiveWeekDaysData = handleMostProductiveWeekDays(
            queriedTasks,
            weekDays
        );
        setProductiveWeekDay(productiveWeekDaysData);

        const productiveHoursData = handleMostProductiveHours(queriedTasks);
        setProductiveHours(productiveHoursData);
    };

    const onSuccessReasons = (queriedReasons: IReason[]) => {
        const unproctiveWeekDaysData = handleLeastProductiveWeekDays(
            queriedReasons,
            weekDays
        );
        setunproductiveWeekDay(unproctiveWeekDaysData);

        const unproductiveHoursData =
            handleLeastProductiveHours(queriedReasons);
        setUnproductiveHours(unproductiveHoursData);
    };
    const { isFetching: isFetchingTasks } = useQuery<ITask[]>(
        ['tasks'],
        async () => getTasks(),
        { onSuccess: onSuccessTasks, refetchOnWindowFocus: false }
    );

    const { isFetching: isFetchingReasons } = useQuery<IReason[]>(
        ['reasons'],
        async () => getReasons(),
        { onSuccess: onSuccessReasons, refetchOnWindowFocus: false }
    );

    const data = weekDays.map(({ weekDay }) => {
        return { name: weekDay, value: 100 };
    });

    return (
        <DashboardLayoutPage>
            <div className={style.metricsPage}>
                <h1>Metrics</h1>
                <div className={style.metricsContent}>
                    {!isFetchingTasks && !isFetchingReasons && (
                        <div className={style.chartsContent}>
                            <Chart
                                titleContent={'Most Productive Weekdays'}
                                data={productiveWeekDay}
                            />
                            <Chart
                                titleContent={'Most Productive Hours'}
                                data={productiveHours}
                            />
                            <Chart
                                titleContent={'Most Procrastinating Weekdays'}
                                data={unproductiveWeekDay}
                            />
                            <Chart
                                titleContent={'Most Procrastinating Hours'}
                                data={unproductiveHours}
                            />
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayoutPage>
    );
}
