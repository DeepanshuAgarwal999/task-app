import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTaskContext } from '../context/TaskContext'
import { zodResolver } from '@hookform/resolvers/zod'

const TaskSchema = z.object({
    title: z.string(),
    description: z.string()
})

const TaskForm = ({ taskId }: { taskId?: number }) => {
    const { state, dispatch } = useTaskContext()

    const task = taskId ? state[taskId] : null
    const values = {
        title: task?.title || "",
        description: task?.description || ""
    }

    const { register, handleSubmit, formState, reset, } = useForm({
        resolver: zodResolver(TaskSchema),
        defaultValues: values
    })

    function onSubmit(values: z.infer<typeof TaskSchema>) {
        console.log(values)
        if (taskId) { }
        else {
            dispatch({
                type: "ADD_TASK",
                payload: {
                    task: {
                        id: Date.now(),
                        title: values.title,
                        description: values.description,
                        done: false,
                        createdAt: new Date(),
                        tasks: []
                    }
                }
            })
        }
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <input type='text' placeholder='Task'  {...register('title')} />
            <input type='text' placeholder='Description' {...register('description')} />
            <button type='submit'>Add</button>
        </form>
    )
}

export default TaskForm