import { Draggable } from '@hello-pangea/dnd';
import style from './Task.module.scss'

import { Card } from '../Card/Card';
import { CardFooter } from '../Card/CardFooter';
import { MiniCard } from '../Card/MiniCard';
import { CardHeader } from '../Card/CardHeader';
import { Modal } from '../Modal/Modal';
import { useModalContext } from '../../hooks/useModalContext';
import { Option } from '../../elements/Sidebar/Option';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../services/api';
import { queryClient } from '../../common/utils/queryClient';
import { TaskOptions } from './TaskOptions';

export function Task({ index, id, title, status }: { index: number; id: string, title: string, status: "done" | "onCourse" | "todo" }) {
  const { openModal, closeModal } = useModalContext();

  const deleteTaskMutation = useMutation(() => {
    return api.delete(`tasks/${id}`);
  }, {
        onSuccess: () => {
        closeModal();
        queryClient.invalidateQueries(['tasks']);
      }
  });

  const finishTaskMutation = useMutation(() => {
    const newStatus = status === 'done' ? 'todo' : 'done'; 
    return api.put(`tasks/${id}`, { status: newStatus })
  }, {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']);
      }
  })

  return (
    <>
    <Draggable draggableId={`task-${id}`} index={index} key={id}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`${style.draggable} ${status === 'done' ? style.doneTask : ''}`}
        >
          <Card type='task' done={status === 'done'}>
            <CardHeader>
              <span className={status === 'done' ? style.closeButtonDone : style.closeButton} onClick={e => openModal(e, `task-${id}`)}>&#x2715;</span>
            </CardHeader>
            {title}
            <CardFooter type='task'>
              <MiniCard active={status === 'done'} type='box'>
                <span className={style.taskButton}>...</span>
              </MiniCard>
              <MiniCard active={status === 'done'} type='box'>
                <span 
                  className={style.taskButton}
                  onClick={() => finishTaskMutation.mutate()}
                >
                  {status === 'done' ? <>&#10004;</> : <>&nbsp;&nbsp;&nbsp;</>}
                </span>
              </MiniCard>
            </CardFooter>
          </Card>
        </div>
      )}
    </Draggable>
    <Modal modalId={`task-${id}`}>
        <p>Are you sure you want to delete this task?</p>
        <button 
          onClick={() => deleteTaskMutation.mutate()}
        >
          <Option type='small' title='Yes' />
        </button>
        <button onClick={() => closeModal(`task-${id}`)}><Option type='small' title='Noooo!' /></button>
    </Modal>
    </>
  );
}
