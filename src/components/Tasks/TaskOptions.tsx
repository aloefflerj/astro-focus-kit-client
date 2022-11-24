import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import { useState } from 'react';
import { INewTaskRequest, IUpdateTaskRequest } from '../../common/types';
import { queryClient } from '../../common/utils/queryClient';
import { Option } from '../../elements/Sidebar/Option';
import { useKeyDown } from '../../hooks/useKeyDown';
import { useModalContext } from '../../hooks/useModalContext';
import { api } from '../../services/api';
import style from './TaskOptions.module.scss';

export function TaskOptions({
    taskRequest,
    action,
}: {
    taskRequest: INewTaskRequest | IUpdateTaskRequest;
    action: 'create' | 'update';
}) {
    const [title, setTitle] = useState(taskRequest.title ?? '');
    const [description, setDescription] = useState(taskRequest.description ?? '');
    const { closeModal } = useModalContext();
    const { handleOnEnter, handleOnCtrlEnter } = useKeyDown();

    const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const clearFiels = () => {
        setTitle('');
        setDescription('');
    }

    const handleDescriptionInput = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescription(e.target.value);
    };

    const newTaskMutation = useMutation(
        (newTask: INewTaskRequest) => {
            return api.post('/tasks', newTask);
        },
        {
            onSuccess: () => {
                clearFiels();
                closeModal();
                queryClient.invalidateQueries(['tasks']);
            },
        }
    );

    const updateTaskMutation = useMutation(
        (updatedTask: IUpdateTaskRequest) => {
            return api.put(`/tasks/${updatedTask.id}`, updatedTask);
        },
        {
            onSuccess: () => {
                clearFiels();
                closeModal();
                queryClient.invalidateQueries(['tasks']);
            },
        }
    );

    const handleTaskForm = async () => {
        if (title.length === 0) {
            alert('Title cannot be empty');
            return;
        }

        switch (action) {
            case 'create':
                newTaskMutation.mutate({
                    order: taskRequest.order,
                    title: title,
                    type: 'binary',
                    status: 'onCourse',
                    urgent: false,
                    important: false,
                    description: description,
                    registerDate: moment(taskRequest.registerDate).format(),
                    conclusionDate: null,
                    deleted: false,
                });
                break;
            case 'update':
                updateTaskMutation.mutate({
                    ...taskRequest,
                    title: title,
                    description: description,
                    registerDate: moment(taskRequest.registerDate).format(),
                } as IUpdateTaskRequest);
                break;
        }
    };

    return (
        <div className={style.newTaskOptionForm}>
            <h3>New Task</h3>
            <input
                className='input'
                type='text'
                placeholder='type the title of the task'
                name='title'
                value={title}
                onChange={handleTitleInput}
                onKeyDown={e => handleOnEnter(e, handleTaskForm)}
            />
            <textarea
                className='input'
                placeholder='type the description of the task'
                rows={10}
                name='description'
                value={description}
                onChange={handleDescriptionInput}
                onKeyDown={e => handleOnCtrlEnter(e, handleTaskForm)}
            />
            <button onClick={handleTaskForm}>
                <Option type='small' title='ADD' />
            </button>
        </div>
    );
}
