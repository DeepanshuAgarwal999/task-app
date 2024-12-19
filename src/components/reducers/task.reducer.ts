const initialState: Tasks = {}

const taskReducer = (state = initialState, action: TaskAction) => {
  switch (action.type) {
    case "ADD_TASK":
      if (action.payload.parentId) {
        const parentTask = state[action.payload.parentId];
        if (parentTask) {
          return {
            ...state,
            [action.payload.parentId]: {
              ...parentTask,
              tasks: [...parentTask.tasks, action.payload.task.id],
            },
            [action.payload.task.id]: action.payload.task,
          };
        }
      }
      return {
        ...state,
        [action.payload.task.id]: action.payload.task,
      };

    case "DELETE_TASK":
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;

    case "EDIT_TASK":
      const newTask = { ...state[action.payload.id] };
      newTask.title = action.payload.title;
      return {
        ...state,
        [action.payload.id]: newTask,
      };
    default:
      return state;
  }
};

export default taskReducer;
