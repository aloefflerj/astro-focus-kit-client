import moment from 'moment'
import { IReason, ITask } from '../types';

export const getWeekTitleFromTaskDay = (task: ITask) => {
    const weekStart = moment(task.registerDate).startOf('week');
    const weekEnd = moment(task.registerDate).endOf('week');
    return `${weekStart.format('DD MMM')} » ${weekEnd.format('DD MMM')}`;
}

export const getWeekTitleFromReasonDay = (reason: IReason) => {
    const weekStart = moment(reason.reasonDateTime).startOf('week');
    const weekEnd = moment(reason.reasonDateTime).endOf('week');
    return `${weekStart.format('DD MMM')} » ${weekEnd.format('DD MMM')}`;
}