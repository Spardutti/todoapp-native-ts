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
  friends: Friends[];
  username: string;
  _id: string;
}

export interface Friends {
  friendName: string;
  id: string;
}

export interface FriendRequest {
  status: string;
  id: string;
  friendName: string;
}
