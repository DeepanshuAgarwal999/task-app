type Task = {
  id: number;
  title: string;
  done: boolean;
  parentId?: number | null;
  description: string;
  createdAt: Date;
  tasks: number[];
};

type Tasks = {
  [id: number]: Task;
};

type TaskAction =
  | { type: "ADD_TASK"; payload: { parentId?: number; task: Task } }
  | {
      type: "EDIT_TASK";
      payload: { parentId?: number; title: string; id: number };
    }
  | { type: "DELETE_TASK"; payload: { parentId?: number; id: number } }
  | { type: "TOGGLE_TASK"; payload: { id: number } };
