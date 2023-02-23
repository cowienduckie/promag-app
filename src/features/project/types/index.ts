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

export enum TriggerType {
  MarkAsComplete = "MarkAsComplete",
  MarkAsIncomplete = "MarkAsIncomplete",
  MoveToColumn = "MoveToColumn"
}

export enum ActionType {
  MarkAsComplete = "MarkAsComplete",
  MarkAsIncomplete = "MarkAsIncomplete",
  MoveToColumn = "MoveToColumn"
}

export interface IRule {
  id: string;
  triggerType: TriggerType;
  triggerValue: string | IColumn;
  actionType: ActionType;
  actionValue: string | IColumn;
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  tasks: ITaskSet;
  columns: IColumnSet;
  columnOrder: string[];
  customRules: IRule[];
}
