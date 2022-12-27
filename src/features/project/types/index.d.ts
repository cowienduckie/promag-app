export interface TaskType {
  id: string;
  content: string;
}

export interface TaskListType {
  [key: string]: TaskType;
}

export interface ColumnType {
  id: string;
  title: string;
  taskIds: string[];
}

export interface ColumnListType {
  [key: string]: ColumnType;
}
