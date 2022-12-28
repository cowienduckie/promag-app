export interface ITask {
  id: string;
  content: string;
}

export interface ITaskSet {
  [key: string]: ITask;
}

export interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
}

export interface IColumnSet {
  [key: string]: IColumn;
}

export interface IProject {
  id: string;
  name: string;
  tasks: ITaskSet;
  columns: IColumnSet;
  columnOrder: string[];
}
