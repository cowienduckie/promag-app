import { IProject, IColumn } from "@/features/project/types";
import { DraggableLocation } from "react-beautiful-dnd";

export const moveTaskSameColumn = (
  currentState: IProject,
  draggableId: string,
  source: DraggableLocation,
  destination: DraggableLocation,
  column: IColumn
): IProject => {
  const newTaskIds = Array.from(column.taskIds);

  newTaskIds.splice(source.index, 1);
  newTaskIds.splice(destination.index, 0, draggableId);

  const newColumn = {
    ...column,
    taskIds: newTaskIds
  };

  return {
    ...currentState,
    columns: {
      ...currentState.columns,
      [newColumn.id]: newColumn
    }
  };
};
