import { IProject } from "@/features/project/types";

export const MoveTaskToColumn = (
  project: IProject,
  taskId: string,
  fromColumn: string,
  toColumn: string
) => {
  return {
    ...project,
    columns: {
      ...project.columns,
      [fromColumn]: {
        ...project.columns[fromColumn],
        taskIds: [
          ...project.columns[fromColumn].taskIds.filter((id) => id !== taskId)
        ]
      },
      [toColumn]: {
        ...project.columns[toColumn],
        taskIds: [...project.columns[toColumn].taskIds, taskId]
      }
    },
    tasks: {
      ...project.tasks,
      [taskId]: {
        ...project.tasks[taskId],
        column: toColumn
      }
    }
  };
};

export const ToggleCompletion = (
  project: IProject,
  taskId: string,
  value: boolean
) => {
  return {
    ...project,
    tasks: {
      ...project.tasks,
      [taskId]: {
        ...project.tasks[taskId],
        isCompleted: value
      }
    }
  };
};
