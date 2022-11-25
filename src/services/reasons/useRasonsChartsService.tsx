import moment from 'moment';
import { IDay, IReason } from '../../common/types';

export const useRasonsChartsService = () => ({
    handleLeastProductiveWeekDays: (
        reasons: IReason[],
        weekDays: IDay[]
    ): {
        name: string;
        value: number;
    }[] => {
        let unproductiveWeekDaysValue: { name: string; value: number }[] = [];
        weekDays.forEach(({ weekDay }) => {
            const name = weekDay;
            let value = 0;
            reasons.forEach(({ reasonDateTime }) => {
                if (weekDay === moment(reasonDateTime).format('dddd')) {
                    value++;
                }
            });
            unproductiveWeekDaysValue.push({ name, value });
        });

        const unproductiveWeekDaysValueFromatted =
            unproductiveWeekDaysValue.filter(({ value }) => value !== 0);

        const unproductiveWeekDaysValuePercentage = calcPercentage(
            unproductiveWeekDaysValueFromatted
        );

        return unproductiveWeekDaysValuePercentage;
    },
    handleLeastProductiveHours: (
        reasons: IReason[]
    ): {
        name: string;
        value: number;
    }[] => {
        const dayHours = [
            '01 AM',
            '02 AM',
            '03 AM',
            '04 AM',
            '05 AM',
            '06 AM',
            '07 AM',
            '08 AM',
            '09 AM',
            '10 AM',
            '11 AM',
            '12 AM',
            '01 PM',
            '02 PM',
            '03 PM',
            '04 PM',
            '05 PM',
            '06 PM',
            '07 PM',
            '08 PM',
            '09 PM',
            '10 PM',
            '11 PM',
            '12 PM',
        ];
        let productiveHours: { name: string; value: number }[] = [];
        dayHours.forEach(hours => {
            const name = hours;
            let value = 0;
            reasons.forEach(({ reasonDateTime }) => {
                if (hours === moment(reasonDateTime).format('hh A')) {
                    value++;
                }
            });
            productiveHours.push({ name, value });
        });

        const productiveHoursFromatted = productiveHours.filter(
            ({ value }) => value !== 0
        );

        const productiveHoursPercentage = calcPercentage(
            productiveHoursFromatted
        );

        return productiveHoursPercentage;
    },
});

function calcPercentage(
    data: {
        name: string;
        value: number;
    }[]
): {
    name: string;
    value: number;
}[] {
    //qty*100/total
    let total = 0;
    data.forEach(({ value }) => {
        total += value;
    });

    return data.map(({ name, value }) => {
        if (total === 100) return { name, value: 0 };

        const percentage = parseFloat(((value * 100) / total).toFixed(0));
        return { name, value: percentage };
    });
}
