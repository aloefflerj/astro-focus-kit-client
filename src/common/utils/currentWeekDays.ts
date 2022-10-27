import moment from 'moment'
import { IDay } from '../types';

import { v4 as uuidv4 } from 'uuid'

export const currentWeekDays = (): IDay[] => {
    const weekStart = moment().startOf('week');

    let days = [];
    for (let i = 0; i <= 6; i++) {
        days.push(moment(weekStart).add(i, 'days'));
    }

    days = days.map((day) => {
        return {
            id: uuidv4(),
            date: day.format('YYYY/MM/DD'),
            monthDay: day.format('DD'),
            weekDay: day.format('dddd')
        }
    });

    return days;
}