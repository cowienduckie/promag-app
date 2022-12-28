import { IProject } from "@/features/project/types";
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
  state: IProject;
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
  };

  return { onDragEnd, state };
};
