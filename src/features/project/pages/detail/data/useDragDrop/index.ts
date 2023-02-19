import { updateProject } from "@/features/project/apis";
import { IColumn, IProject } from "@/features/project/interfaces";
import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import {
  moveColumn,
  moveTaskSameColumn,
  moveTaskToAnotherColumn
} from "./functions";

type Props = {
  project: IProject;
};

type ReturnType = {
  onDragEnd: (result: DropResult) => void;
  onCompleteTask: (taskId: string, currentColumn: IColumn) => void;
  state: IProject;
  setState: (project: IProject) => void;
};

export const useDragDrop = (props: Props): ReturnType => {
  const { project } = props;
  const [state, setState] = useState(project);

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
      newState = moveColumn(state, draggableId, source, destination);
    } else {
      const start = state.columns[source.droppableId];
      const finish = state.columns[destination.droppableId];

      if (start === finish) {
        newState = moveTaskSameColumn(
          state,
          draggableId,
          source,
          destination,
          start
        );
      } else {
        newState = moveTaskToAnotherColumn(
          state,
          draggableId,
          source,
          destination,
          start,
          finish
        );
      }
    }

    setState(newState);
    updateProject(newState.id, newState);
  };

  const onCompleteTask = (taskId: string, currentColumn: IColumn): void => {
    const startTaskIds = Array.from(currentColumn.taskIds);
    const index = startTaskIds.indexOf(taskId);
    startTaskIds.splice(index, 1);

    const newStart = {
      ...currentColumn,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(state.columns["column-3"].taskIds);
    finishTaskIds.splice(finishTaskIds.length, 0, taskId);

    const newFinish = {
      ...state.columns["column-3"],
      taskIds: finishTaskIds
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [currentColumn.id]: newStart,
        ["column-3"]: newFinish
      }
    };

    setState(newState);
    updateProject(newState.id, newState);
  };

  return { onDragEnd, onCompleteTask, state, setState };
};
