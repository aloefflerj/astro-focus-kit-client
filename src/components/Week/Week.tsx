import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import axios from 'axios';

import { IDay, ITask, ITaskDay } from '../../common/types';
import { currentWeekDays } from '../../common/utils/currentWeekDays';
import { useQuery } from '@tanstack/react-query';
import { EnvironmentConfig } from '../../config/environmentConfig';
import { Day } from '../Day/Day';
import style from './Week.module.scss';
import { useEffect, useState } from 'react';

const basePath = EnvironmentConfig.mainServerApiBasePath;

const weekDays = currentWeekDays();

export function Week() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const { data: queriedTasks, isFetching: isFetchingTasks } = useQuery<ITask[]>(
    ['tasks'],
    async () => {
      const response = await axios.get(`${basePath}/tasks`);
      return response.data;
    },
    { onSuccess: queriedTasks => setTasks(queriedTasks) }
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
    
    if (tasksBySourceDay) {
      tasksBySourceDay.splice(source.index, 1);
    }
    
    if (grabbedTask === null || grabbedTask === undefined || fromWeekDay === undefined) {
      return;
    }

    const toWeekDay: IDay | undefined = weekDays.find(
      ({ id }) => id === destination.droppableId
    ); 

    let tasksByDestinationDay = filterTasks(tasks, toWeekDay);
    const draggedToIndexDay = tasksByDestinationDay ? tasksByDestinationDay.find(({order}) => order === destination.index) : null;

    if (draggedToIndexDay === null || draggedToIndexDay === undefined || toWeekDay === undefined || tasksByDestinationDay === undefined) {
      return;
    }

    grabbedTask.registerDate = toWeekDay.date;
    grabbedTask.order = destination.index;

    const updatedTasks = tasks.map((task: ITask) => {

      if (task.registerDate === toWeekDay.date) {
        if (task.id === grabbedTask.id) return grabbedTask;
        if (task.order >= grabbedTask.order) task.order++;
      }

      return task;
    });

    setTasks(updatedTasks);

    // tasksByDestinationDay.splice(destination.index, 0, grabbedTask);

    // console.log(tasksByDestinationDay);

    // const updatedTasks: ITask[] = [];
    // tasks.forEach((task: ITask, index: number) => {
    //   if (!tasksByDestinationDay?.includes(task)) {
    //     updatedTasks[index] = task;

    //   }
    // })
    // const updatedTasks = tasks.filter((task) => {if (!tasksByDestinationDay?.includes(task)) return task} )
    // tasksByDestinationDay.map((task, index) => tasks.splice(index, 1));
    // const filteredUpdatedTasks = filterTasks(updatedTasks, toWeekDay);
    // if (filteredUpdatedTasks === undefined)
    //   return;
  
    // console.log(updatedTasks);
    // setTasks([...tasksByDestinationDay, ...updatedTasks]);
    // console.log(tasks)


    // const grabbedTask = tasks[source.index];
    // console.log(tasks);
    // console.log(source.index);
    // console.log(grabbedTask);
    // const dayColumn: IDay = weekDays[source.index];
    // console.log(dayColumn);
    // const newTaskIds = Array.from(dayColumn.id);
    // console.log(newTaskIds);
    // newTaskIds.splice(source.index, 1);
    // newTaskIds.splice(destination.index, 0, draggableId);

    // const newColumn = {
    //   ...dayColumn,
    //   tasks: newTaskIds,
    // };

    // setTasks(newColumn);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isFetchingTasks && <h1>Loading tasks...</h1>}
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
