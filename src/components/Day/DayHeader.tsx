import { Card } from '../Card/Card'
import { MiniCard } from "../Card/MiniCard";

interface Props {
    title: 'SUNDAY' | 'MONDAY' | 'THUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY',
    today: boolean
}

export function DayHeader({title, today}: Props) {
    const todayCard = today === true ? 'star' : 'box';
    
    return (
        <Card type='dayHeader'>
            {title}
            <MiniCard type={todayCard} >
                28
            </MiniCard>
        </Card>
    )
}
