import React from 'react'
import { useTaskContext } from '../context/TaskContext'
import TaskElement from './TaskElement'

const TaskList = () => {
    const { state } = useTaskContext()
    const tasks = Object.values(state)
    const rootTasks = tasks.filter((task) => !task.parentId).map((task) => task)
    return (
        <div className='space-y-4 mt-10'>
            {
                rootTasks.map((task, index) => {
                    return <TaskElement task={task} key={index} />
                })
            }
        </div>
    )
}

export default TaskList