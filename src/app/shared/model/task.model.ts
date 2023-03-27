export interface Task {
  id: string;
  categories: string[];
  participants: string[];
  subtasks: Subtask[];
  taskDescription: string;
  taskTitle: string;
  timeline: {
    from: string;
    to: string;
  }
}

export interface Subtask {
  id: string;
  task: string;
}
