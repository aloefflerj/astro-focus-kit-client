import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import { IDay, ITask } from '../../common/types';
import { currentWeekDays } from '../../common/utils/currentWeekDays';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Day } from '../Day/Day';
import style from './Week.module.scss';
import { useState } from 'react';
import { useTasksApi } from '../../services/tasks/useTasksApi';
import moment from 'moment';
import { api } from '../../services/api';

const weekDays = currentWeekDays();

interface IReorderTasksRequest {
  grabbedTaskId: string;
  order: number;
  destinationDate: string;
}

export function Week() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { getTasks } = useTasksApi();
  const onSuccess = (queriedTasks: ITask[]) => setTasks(queriedTasks.map((task) => {
    task.registerDate = moment(task.registerDate).format('YYYY/MM/DD');
    return task
  }))

  const { isFetching: isFetchingTasks } = useQuery<ITask[]>(
    ['tasks'],
    async () => getTasks(),
    { onSuccess, refetchOnWindowFocus: false }
  );

  const tasksReorderingMutation = useMutation((reorderTasksRequest: IReorderTasksRequest) => {
    const {grabbedTaskId} = reorderTasksRequest;
    return api.patch(`/tasks/reorder/${grabbedTaskId}`, {
      order: reorderTasksRequest.order,
      destinationDate: reorderTasksRequest.destinationDate
    });
  })

  const filterTasks = (
    tasks: ITask[] | undefined,
    day: IDay | undefined
  ): ITask[] | undefined => {
    if (tasks === undefined) return;

    const filteredTasks: ITask[] | undefined = tasks?.filter((task: ITask) => {
      return task.registerDate === day?.date;
    });

    filteredTasks.sort((a: ITask, b: ITask) => a.order - b.order)

    return filteredTasks;
  };

  const onDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const fromWeekDay: IDay | undefined = weekDays.find(
      ({ id }) => id === source.droppableId
    );

    let tasksBySourceDay = filterTasks(tasks, fromWeekDay);
    const grabbedTask = tasksBySourceDay ? tasksBySourceDay.find(({order}) => order === source.index) : null;
    
    if (grabbedTask === null || grabbedTask === undefined || fromWeekDay === undefined) {
      return;
    }

    let updatedTasks = tasks.map((task) => {
      if (grabbedTask.id !== task.id && fromWeekDay.date === task.registerDate) {
        if (task.order > grabbedTask.order)
          task.order--;
      }
      return task;
    })


    const toWeekDay: IDay | undefined = weekDays.find(
      ({ id }) => id === destination.droppableId
    ); 

    if (toWeekDay === undefined)
      return;

    let tasksByDestinationDay = filterTasks(tasks, toWeekDay);
    if (tasksByDestinationDay?.length === 0) {
      
      grabbedTask.registerDate = toWeekDay.date;
      grabbedTask.order = destination.index;
      
      const newTasks = tasks.map((task) => {
        if (task.id === grabbedTask.id)
          return grabbedTask;

        return task;
      })
      
      setTasks(newTasks);
    }
    
    grabbedTask.registerDate = toWeekDay.date;
    grabbedTask.order = destination.index;

    updatedTasks = tasks.map((task: ITask) => {

      if (task.registerDate === toWeekDay.date) {
        if (task.id === grabbedTask.id) return grabbedTask;
        if (task.order >= grabbedTask.order) task.order++;
      }

      return task;
    });

    setTasks(updatedTasks);

    const reorderTasksRequest: IReorderTasksRequest = {
      grabbedTaskId: grabbedTask.id,
      order: destination.index,
      destinationDate: moment(grabbedTask.registerDate).toString()
    }

    tasksReorderingMutation.mutate(reorderTasksRequest);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={style.week}>
        {weekDays.map(day => (
          <Day
            key={day.id}
            weekDay={day.weekDay.toUpperCase()}
            monthDay={day.monthDay}
            date={day.date}
            id={day.id}
            tasks={filterTasks(tasks, day)}
            today={day.weekDay === moment().format('dddd')}
            loading={isFetchingTasks || tasksReorderingMutation.isLoading}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
