import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTaskContext } from '../context/TaskContext';
import { zodResolver } from '@hookform/resolvers/zod';

const TaskSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required')
});

const TaskForm = ({ taskId, closeModal, parentId }: { taskId?: number; closeModal: () => void; parentId?: number }) => {
    const { state, dispatch } = useTaskContext();
    const task = taskId ? state[taskId] : null;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        resolver: zodResolver(TaskSchema),
        defaultValues: {
            title: '',
            description: ''
        }
    });
    React.useEffect(() => {
        if (task) {
            setValue('title', task.title);
            setValue('description', task.description);
        }
    }, [task, setValue]);

    function onSubmit(values: z.infer<typeof TaskSchema>) {
        if (taskId) {
            dispatch({
                type: 'EDIT_TASK',
                payload: {
                    id: taskId,
                    title: values.title,
                    description: values.description
                }
            });
        } else {
            const newTask = {
                id: Date.now(),
                title: values.title,
                description: values.description,
                done: false,
                parentId: parentId ?? null,
                createdAt: new Date(),
                tasks: []
            };

            dispatch({
                type: 'ADD_TASK',
                payload: parentId ? { parentId, task: newTask } : { task: newTask }
            });
        }
        reset();
        closeModal();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="Title"
                {...register('title')}
                className="border-2 p-2 border-black text-black"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}

            <input
                type="text"
                placeholder="Description"
                {...register('description')}
                readOnly={taskId !== undefined}
                className={`border-2 text-black border-black p-2 ${taskId !== undefined ? 'cursor-not-allowed' : ''}`}
                disabled={!!taskId}
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}

            <button type="submit" className="bg-red-500 h-12 rounded-md text-white">
                {parentId ? 'Add Subtask' : taskId ? 'Update' : 'Add'}
            </button>
        </form>
    );
};

export default TaskForm;
