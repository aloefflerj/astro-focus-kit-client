import { Card } from '../Card/Card'
import { MiniCard } from "../Card/MiniCard";
import { CardFooter } from "../Card/CardFooter";

interface Props {
    title: 'SUNDAY' | 'MONDAY' | 'THUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY',
    today: boolean
}

export function DayHeader({title, today}: Props) {
    const todayCard = today === true ? 'star' : 'box';
    
    return (
        <Card type='dayHeader'>
            {title}
            <CardFooter type='dayHeader'>
                <MiniCard type={todayCard} >
                    28
                </MiniCard>
            </CardFooter>
        </Card>
    )
}
