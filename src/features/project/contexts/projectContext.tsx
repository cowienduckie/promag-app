import React, { createContext, useReducer } from "react";
import { IProject } from "@/features/project/types";
import _ from "lodash";
import { updateProjectApi } from "@/features/project/apis";

type ProjectContextProps = {
  project: IProject;
  setProject: (project: IProject) => void;
  updateProject: (project: IProject) => void;
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

const updateProject = (project: IProject, state: IProject): IProject => {
  _.assign(state, { ...project });

  updateProjectApi(project.id, project);

  return {
    ...state
  };
};

const projectReducer = (
  state: IProject,
  action: { project: IProject; type: ProjectAction }
): IProject => {
  switch (action.type) {
    case ProjectAction.SetProject:
      return setProject(action.project, state);

    case ProjectAction.UpdateProject:
      return updateProject(action.project, state);

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

  const updateProject = (project: IProject) => {
    dispatch({ type: ProjectAction.UpdateProject, project });
  };

  return (
    <ProjectContext.Provider value={{ project, setProject, updateProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
