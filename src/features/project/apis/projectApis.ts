import { axios } from "@/lib/axios";
import {
  PagedList,
  ProjectDto,
  ProjectMinimalDto,
  Wrapper
} from "@/features/project/apis/types";
import { IColumnSet, IProject, ITaskSet } from "@/features/project/interfaces";

export const getProjectById = (projectId: string): Promise<IProject> => {
  return axios<Wrapper<ProjectDto>>(`/projects/${projectId}`).then(
    (response) => {
      const project = response.data.data;

      console.log(project);

      if (!!project) {
        return {
          id: project.id,
          name: project.name,
          description: project.description,
          tasks: project.workColumns.reduce((acc, column) => {
            column.workItems.forEach((task) => {
              acc[task.id] = {
                id: task.id,
                content: task.name,
                isCompleted: task.isCompleted
              };
            });

            return acc;
          }, {} as ITaskSet),
          columns: project.workColumns.reduce((acc, column) => {
            acc[column.id] = {
              id: column.id,
              title: column.name,
              taskIds: column.workItems.map((task) => task.id)
            };

            return acc;
          }, {} as IColumnSet),
          columnOrder: [...project.workColumns.map((column) => column.id)]
        };
      } else {
        throw new Error("Project not found");
      }
    }
  );
};

export const getProjects = (): Promise<IProject[]> => {
  return axios<Wrapper<PagedList<ProjectMinimalDto>>>(`/projects`).then(
    (response) => {
      return (
        response.data.data?.items.map((project) => ({
          id: project.id,
          name: project.name,
          description: project.description,
          tasks: {},
          columns: {},
          columnOrder: []
        })) ?? []
      );
    }
  );
};

export const updateProject = (projectId: string, project: IProject) => {
  return axios.put(`/projects/${projectId}`, project);
};
