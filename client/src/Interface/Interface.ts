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

export interface User {
  email: string;
  friendRequest: [{ status: string; id: string }];
  friends: [];
  username: string;
  _id: string;
}
