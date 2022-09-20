import { Card } from '../Card/Card';
import { CardFooter } from '../Card/CardFooter';
import { MiniCard } from '../Card/MiniCard';

export function Task() {
  return (
    <Card type='task'>
      Estudar
      <CardFooter type='task'>
        <MiniCard active={false} type='box'>
          ...
        </MiniCard>
        <MiniCard active={false} type='box'>
          ...
        </MiniCard>
      </CardFooter>
    </Card>
  );
}
