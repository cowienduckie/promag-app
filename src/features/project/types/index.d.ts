export interface ITask {
  id: string;
  content: string;
  isCompleted: boolean;
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

export type WorkItem = {
  id: string;
  name: string;
  description: string?;
  isCompleted: boolean;
  position: number;
  workColumnId: string;
};

export type WorkColumn = {
  id: string;
  name: string;
  position: number;
  workItems: WorkItem[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
};
