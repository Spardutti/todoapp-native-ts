export interface Todo {
  _id: string;
  todoName: string;
  dueDate: string;
  isCompleted: boolean;
  todoDescription: string;
  category: { categoryName: string; _id: string; color: string };
  author: {
    _id: string;
    username: string;
  };
  updated: string;
  updateType: string;
}
