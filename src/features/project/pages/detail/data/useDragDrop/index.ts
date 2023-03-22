import { IProject, TriggerType } from "@/features/project/types";
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

      projectContext.updateProject(newState);
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
        projectContext.updateProject(newState);
      } else {
        newState = moveTaskToAnotherColumn(
          projectContext.project,
          draggableId,
          source,
          destination,
          start,
          finish
        );

        projectContext.updateProject(newState, {
          taskId: draggableId,
          triggerType: TriggerType.MoveToColumn,
          triggerValue: newState.columns[destination.droppableId]
        });
      }
    }
  };

  return { onDragEnd, state: projectContext.project };
};
