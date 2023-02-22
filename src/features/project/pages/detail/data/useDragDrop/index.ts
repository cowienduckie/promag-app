import { IColumn, IProject } from "@/features/project/types";
import { useContext } from "react";
import { DropResult } from "react-beautiful-dnd";
import {
  moveColumn,
  moveTaskSameColumn,
  moveTaskToAnotherColumn
} from "./functions";
import { ProjectContext } from "@/features/project/contexts/projectContext";

type ReturnType = {
  onDragEnd: (result: DropResult) => void;
  onCompleteTask: (taskId: string, currentColumn: IColumn) => void;
  state: IProject;
};

export const useDragDrop = (): ReturnType => {
  const projectContext = useContext(ProjectContext);

  const onDragEnd = (result: DropResult): void => {
    const { draggableId, source, destination, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let newState: IProject;

    if (type === "column") {
      newState = moveColumn(
        projectContext.project,
        draggableId,
        source,
        destination
      );
    } else {
      const start = projectContext.project.columns[source.droppableId];
      const finish = projectContext.project.columns[destination.droppableId];

      if (start === finish) {
        newState = moveTaskSameColumn(
          projectContext.project,
          draggableId,
          source,
          destination,
          start
        );
      } else {
        newState = moveTaskToAnotherColumn(
          projectContext.project,
          draggableId,
          source,
          destination,
          start,
          finish
        );
      }
    }

    projectContext.setProject(newState);
    projectContext.updateProject(newState);
  };

  const onCompleteTask = (taskId: string, currentColumn: IColumn): void => {
    const startTaskIds = Array.from(currentColumn.taskIds);
    const index = startTaskIds.indexOf(taskId);
    startTaskIds.splice(index, 1);

    const newStart = {
      ...currentColumn,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(
      projectContext.project.columns["column-3"].taskIds
    );
    finishTaskIds.splice(finishTaskIds.length, 0, taskId);

    const newFinish = {
      ...projectContext.project.columns["column-3"],
      taskIds: finishTaskIds
    };

    const newState = {
      ...projectContext.project,
      columns: {
        ...projectContext.project.columns,
        [currentColumn.id]: newStart,
        ["column-3"]: newFinish
      }
    };

    projectContext.setProject(newState);
    projectContext.updateProject(newState);
  };

  return { onDragEnd, onCompleteTask, state: projectContext.project };
};
