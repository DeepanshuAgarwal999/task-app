import Modal from './components/ui/Modal'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'


const App = () => {
  return (
    <div className='container'>
      <div className='flex flex-col gap-4'>
        <h1 className='mt-10 text-center font-bold text-4xl'>Task App</h1>
        <TaskList />
        <Modal title="Add Task">
          {(closeModal) => <TaskForm closeModal={closeModal} />}
        </Modal>
      </div>

    </div>
  )
}

export default App