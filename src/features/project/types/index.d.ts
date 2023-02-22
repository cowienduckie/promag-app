export interface ITask {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
}

export interface ITaskSet {
  [key: string]: ITask;
}

export interface IColumn {
  id: string;
  name: string;
  taskIds: string[];
}

export interface IColumnSet {
  [key: string]: IColumn;
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  tasks: ITaskSet;
  columns: IColumnSet;
  columnOrder: string[];
}
