import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TaskContextProvider } from './context/TaskContext.tsx'

createRoot(document.getElementById('root')!).render(
  <TaskContextProvider>
    <App />
  </TaskContextProvider>,
)