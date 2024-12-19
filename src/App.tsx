import React, { useReducer } from 'react'
import Modal from './components/ui/Modal'
import { useTaskContext } from './context/TaskContext'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'

const App = () => {
  const { state, dispatch } = useTaskContext()
  return (
    <div className='
    '>
      <h1>
        <TaskList />
        <Modal><TaskForm /></Modal>
      </h1>
    </div>
  )
}

export default App