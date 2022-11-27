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
    deleted: boolean;
}

export interface INewTaskRequest {
    order: number;
    title?: string;
    type?: 'binary' | 'timer' | 'pomodoro';
    status?: 'onCourse' | 'done' | 'todo';
    urgent?: boolean;
    important?: boolean;
    description?: string | null;
    registerDate: string;
    conclusionDate?: string | null;
    deleted?: boolean;
}

export interface IUpdateTaskRequest {
    id: string;
    order: number;
    title: string;
    type: 'binary' | 'timer' | 'pomodoro';
    status: 'onCourse' | 'done' | 'todo';
    urgent: boolean;
    important: boolean;
    description: string | null;
    registerDate: string;
    conclusionDate: string | null;
    deleted: boolean;
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

export interface IReason {
    id?: string;
    content: string;
    reasonDateTime: string;
    site: string;
}

export interface ITimer {
    id: string;
    time: number;
}