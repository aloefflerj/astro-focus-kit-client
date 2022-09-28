import { Card } from '../Card/Card';
import { MiniCard } from '../Card/MiniCard';
import { CardFooter } from '../Card/CardFooter';

interface Props {
  weekDay: string;
  monthDay: string;
  today: boolean;
}

export function DayHeader({ weekDay, monthDay, today }: Props) {
  const todayCard = today === true ? 'star' : 'box';

  return (
    <Card type='dayHeader'>
      {weekDay}
      <CardFooter type='dayHeader'>
        <MiniCard type={todayCard}>{monthDay}</MiniCard>
      </CardFooter>
    </Card>
  );
}
