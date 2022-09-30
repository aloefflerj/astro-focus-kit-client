export interface ITask {
    id: string;
    order: number;
    title: string;
    type: 'binary' | 'timer' | 'pomodoro';
    status: 'onCourse' | 'done' | 'todo';
    urgent: boolean;
    important: boolean;
    description?: string;
    registerDate: string;
    conclusionDate?: string;
}

export interface IDay {
    id: string;
    date: string;
    monthDay: string;
    weekDay: string
}

export interface ITaskDay {
    id: string;
    taskId: string;
    dayId: string;
}

export interface IUser {
    id?: string;
    name?: string;
    email?: string;
    token?: string;
}