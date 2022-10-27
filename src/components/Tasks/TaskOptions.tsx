import { useMutation } from '@tanstack/react-query';
import moment from 'moment';
import { useState } from 'react';
import { INewTaskRequest, IUpdateTaskRequest } from '../../common/types';
import { queryClient } from '../../common/utils/queryClient';
import { Option } from '../../elements/Sidebar/Option';
import { useModalContext } from '../../hooks/useModalContext';
import { api } from '../../services/api';
import style from './TaskOptions.module.scss';

export function TaskOptions({
    taskRequest
}: {
    taskRequest: INewTaskRequest | IUpdateTaskRequest
}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { closeModal } = useModalContext();

    const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

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
                closeModal();
                queryClient.invalidateQueries(['tasks']);
            },
        }
    );

    const handleNewTask = async () => {
        if (title.length === 0) {
            alert('Title cannot be empty');
            return;
        }


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
            />
            <textarea
                className='input'
                placeholder='type the description of the task'
                rows={10}
                name='description'
                value={description}
                onChange={handleDescriptionInput}
            />
            <button onClick={handleNewTask}>
                <Option type='small' title='ADD' />
            </button>
        </div>
    );
}
