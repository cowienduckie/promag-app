import React, { createContext, useReducer } from "react";
import {
  ActionType,
  IColumn,
  IProject,
  TriggerType
} from "@/features/project/types";
import _ from "lodash";
import { updateProjectApi } from "@/features/project/apis";
import {
  MoveTaskToColumn,
  ToggleCompletion
} from "@/features/project/contexts/action-functions";

type ProjectContextProps = {
  project: IProject;
  setProject: (project: IProject) => void;
  updateProject: (project: IProject, trigger?: TriggerInfo | null) => void;
};

type TriggerInfo = {
  taskId: string;
  triggerType: TriggerType;
  triggerValue?: IColumn;
};

enum ProjectAction {
  SetProject = "SET_PROJECT",
  UpdateProject = "UPDATE_PROJECT"
}

export const ProjectContext = createContext<ProjectContextProps>(
  {} as ProjectContextProps
);

const setProject = (project: IProject, state: IProject): IProject => {
  _.assign(state, { ...project });

  return {
    ...state
  };
};

const updateProject = (
  project: IProject,
  state: IProject,
  trigger: TriggerInfo | null = null
): IProject => {
  _.assign(state, { ...project });

  for (const rule of project.customRules) {
    if (
      rule.triggerType === trigger?.triggerType &&
      (rule.triggerValue === "" ||
        (rule.triggerValue as IColumn).id === trigger?.triggerValue?.id)
    ) {
      switch (rule.actionType) {
        case ActionType.MoveToColumn:
          project = MoveTaskToColumn(
            project,
            trigger.taskId,
            project.tasks[trigger.taskId].column,
            (rule.actionValue as IColumn).id
          );
          break;
        case ActionType.MarkAsComplete:
          project = ToggleCompletion(project, trigger.taskId, true);
          break;
        case ActionType.MarkAsIncomplete:
          project = ToggleCompletion(project, trigger.taskId, false);
          break;
        default:
          break;
      }
    }
  }

  updateProjectApi(project.id, project);

  return {
    ...project
  };
};

const projectReducer = (
  state: IProject,
  action: {
    project: IProject;
    type: ProjectAction;
    trigger?: TriggerInfo | null;
  }
): IProject => {
  switch (action.type) {
    case ProjectAction.SetProject:
      return setProject(action.project, state);

    case ProjectAction.UpdateProject:
      return updateProject(action.project, state, action.trigger);

    default:
      return state;
  }
};

export const ProjectProvider = ({
  children,
  initialProject
}: {
  children: React.ReactNode;
  initialProject: IProject;
}) => {
  const [project, dispatch] = useReducer(projectReducer, initialProject);

  const setProject = (project: IProject) => {
    dispatch({ type: ProjectAction.SetProject, project });
  };

  const updateProject = (project: IProject, trigger?: TriggerInfo | null) => {
    dispatch({ type: ProjectAction.UpdateProject, project, trigger });
  };

  return (
    <ProjectContext.Provider value={{ project, setProject, updateProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
