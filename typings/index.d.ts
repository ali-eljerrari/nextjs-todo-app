export type Todo = {
  $collectionId?: string;
  $createdAt?: Date;
  $databaseId?: string;
  $id?: string;
  $permissions?: [];
  $updatedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  isDone?: boolean;
  name: string;
};

export type propsType = {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};
