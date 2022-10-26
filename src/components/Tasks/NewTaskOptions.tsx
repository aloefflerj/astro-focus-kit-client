import moment from "moment";
import { useState } from "react";
import { Option } from "../../elements/Sidebar/Option";
import { api } from "../../services/api";
import style from './NewTaskOption.module.scss';

export function NewTaskOptions({ newTaskOrder, newTaskDate }: { newTaskOrder: number, newTaskDate: string }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };
    
    const handleNewTask = async () => {
        if (title.length === 0) {
            alert('Title cannot be empty');
            return;
        }
        
        const response = await api.post('/tasks', {
            order: newTaskOrder,
            title: title,
            type: 'binary',
            status: 'onCourse',
            urgent: false,
            important: false,
            description: description,
            registerDate: moment(newTaskDate).format(),
            conclusionDate: null,
            deleted: false
        })
    }
    
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
            <button
                onClick={handleNewTask}
            >
                <Option type='small' title='ADD' />
            </button>
        </div>
    );
}