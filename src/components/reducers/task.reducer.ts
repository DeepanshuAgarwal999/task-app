const initialState: Tasks = {};

const getNestedTasks = (task: Task, state: Tasks) => {
  const nestedIds: number[] = [];

  const getNestedTasksHelper = (currentTask: Task) => {
    currentTask.tasks.forEach((id) => {
      nestedIds.push(id);
      getNestedTasksHelper(state[id]);
    });
  };

  getNestedTasksHelper(task);
  return nestedIds;
};

function propagateStatusChange(
  taskId: number,
  currentTaskEntities: Tasks
): Tasks {
  if (!taskId || !currentTaskEntities[taskId]) {
    return currentTaskEntities;
  }

  const task = currentTaskEntities[taskId];
  const nestedIds = getNestedTasks(task, currentTaskEntities);

  const allSubtasksDone = nestedIds.length
    ? nestedIds.every((id) => currentTaskEntities[id].done === true)
    : task.done;

  const updatedTask = { ...task, done: allSubtasksDone };
  const updatedState = { ...currentTaskEntities, [taskId]: updatedTask };

  if (task.parentId) {
    return propagateStatusChange(task.parentId as number, updatedState);
  }

  return updatedState;
}

const taskReducer = (state = initialState, action: TaskAction): Tasks => {
  switch (action.type) {
    case "ADD_TASK": {
      const updatedState = {
        ...state,
        [action.payload.task.id]: action.payload.task,
      };

      if (action.payload.parentId) {
        const parentTask = updatedState[action.payload.parentId];
        if (parentTask) {
          const updatedParentTask = {
            ...parentTask,
            tasks: [...parentTask.tasks, action.payload.task.id],
          };
          return propagateStatusChange(action.payload.parentId, {
            ...updatedState,
            [action.payload.parentId]: updatedParentTask,
          });
        }
      }

      return propagateStatusChange(action.payload.task.id, updatedState);
    }

    case "DELETE_TASK": {
      const newState = { ...state };
      if (action.payload.parentId && newState[action.payload.parentId]) {
        const parentTask = newState[action.payload.parentId];
        newState[action.payload.parentId] = {
          ...parentTask,
          tasks: parentTask.tasks.filter((id) => id !== action.payload.id),
        };
      }
      delete newState[action.payload.id];
      return propagateStatusChange(action.payload.id, newState);
    }

    case "EDIT_TASK": {
      const updatedTask = {
        ...state[action.payload.id],
        title: action.payload.title,
      };
      return {
        ...state,
        [action.payload.id]: updatedTask,
      };
    }

    case "TOGGLE_TASK": {
      const task = state[action.payload.id];
      const newStatus = !task.done;

      const updatedState = {
        ...state,
        [action.payload.id]: { ...task, done: newStatus },
      };

      getNestedTasks(task, state).forEach((id) => {
        updatedState[id] = { ...updatedState[id], done: newStatus };
      });

      return propagateStatusChange(action.payload.id, updatedState);
    }

    default:
      return state;
  }
};

export default taskReducer;
