import React, { useCallback } from 'react'
import Modal from './ui/Modal'
import TaskForm from './TaskForm'
import { useTaskContext } from '../context/TaskContext'

const TaskElement = ({ task }: { task: Task }) => {
  console.log(task)
  const { state, dispatch } = useTaskContext()

  const handleDelete = useCallback(() => {
    dispatch({
      type: 'DELETE_TASK',
      payload: {
        id: task.id,
        parentId: task.parentId
      }
    })
  }, [task.id, task.parentId])

  return (
    <div className='bg-white rounded-xl shadow-xl w-full  p-4 '>
      <div className='flex justify-between'>
        <div>
          <h1 className='text-lg'>
            {task.title}
          </h1>
          <p>
            {task.description}
          </p>
        </div>
        <div className='self-end'>
          <p>{task.createdAt.toLocaleString()}</p>
        </div>
      </div>

      <div className='flex items-center gap-4 text-white'>
        <Modal title='add subtask'>{(closeModal) => <TaskForm parentId={task.id} closeModal={closeModal} />}</Modal>
        <Modal title='Edit Task'>{(closeModal) => <TaskForm taskId={task.id} closeModal={closeModal} />}</Modal>
        <button className='bg-red-500 rounded-md p-2' onClick={handleDelete}>Delete</button>
      </div>
      {
        task.tasks.length > 0 &&
        <div className='mt-4 ml-4 space-y-2'>
          {
            task.tasks.map((taskId, index) => {
              const task = state[taskId]
              return <TaskElement task={task} key={index} />
            })
          }
        </div>
      }

    </div>
  )
}

export default TaskElement