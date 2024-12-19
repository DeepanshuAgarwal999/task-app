import React, { createContext, useContext, useReducer, useState } from "react";
import taskReducer from "../components/reducers/task.reducer";

type TaskContext = {
    state: Tasks, dispatch: React.Dispatch<any>
}
const TaskContext = createContext<null | TaskContext>(null)

export const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(taskReducer, {});
    return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
};

export const useTaskContext = (): TaskContext => {
    const contextValues = useContext(TaskContext);
    if (!contextValues) {
        throw new Error('This needs to be wrapped under TaskContext.Provider');
    }
    return contextValues;
}
