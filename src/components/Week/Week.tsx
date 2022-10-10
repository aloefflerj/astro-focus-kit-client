import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import axios from 'axios';

import { IDay, ITask } from '../../common/types';
import { currentWeekDays } from '../../common/utils/currentWeekDays';
import { useQuery } from '@tanstack/react-query';
import { EnvironmentConfig } from '../../config/environmentConfig';
import { Day } from '../Day/Day';
import style from './Week.module.scss';
import { useState } from 'react';
import { loginApi } from '../../services/api';
import { useTasksApi } from '../../services/tasks/useTasksApi';

const basePath = EnvironmentConfig.mainServerApiBasePath;

const weekDays = currentWeekDays();

export function Week() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { getTasks } = useTasksApi();
  const onSuccess = (queriedTasks: ITask[]) => setTasks(queriedTasks)

  const { isFetching: isFetchingTasks } = useQuery<ITask[]>(
    ['tasks'],
    async () => getTasks(),
    { onSuccess }
  );

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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isFetchingTasks && ''}
      <div className={style.week}>
        {weekDays.map(day => (
          <Day
            key={day.id}
            weekDay={day.weekDay.toUpperCase()}
            monthDay={day.monthDay}
            id={day.id}
            tasks={filterTasks(tasks, day)}
            today={false}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
