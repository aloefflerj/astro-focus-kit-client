import { Draggable } from '@hello-pangea/dnd';
import style from './Task.module.scss'

import { Card } from '../Card/Card';
import { CardFooter } from '../Card/CardFooter';
import { MiniCard } from '../Card/MiniCard';

export function Task({ index, id, title }: { index: number; id: string, title: string }) {
  return (
    <Draggable draggableId={`task-${id}`} index={index} key={id}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={style.draggable}
        >
          <Card type='task'>
            {title}
            <CardFooter type='task'>
              <MiniCard active={false} type='box'>
                ...
              </MiniCard>
              <MiniCard active={false} type='box'>
                &nbsp;&nbsp;&nbsp;
              </MiniCard>
            </CardFooter>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
