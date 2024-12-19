import React from 'react'
import { useTaskContext } from '../context/TaskContext'

const TaskList = () => {
    const { state } = useTaskContext()
    const tasks = Object.values(state)
    console.log(tasks)
    return (
        <div>
            {
                tasks.map((task, index) => {
                    return <div key={index}>{task.title}</div>
                })
            }
        </div>
    )
}

export default TaskList