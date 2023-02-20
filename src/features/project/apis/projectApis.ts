import { axios } from "@/lib/axios";
import {
  PagedList,
  ProjectDto,
  ProjectMinimalDto,
  WorkColumnDto,
  WorkItemDto,
  Wrapper
} from "@/features/project/apis/types";
import { IColumnSet, IProject, ITaskSet } from "@/features/project/interfaces";

export const getProjectById = (projectId: string): Promise<IProject> => {
  return axios<Wrapper<ProjectDto>>(`/projects/${projectId}`).then(
    (response) => {
      const project = response.data.data;

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
                isCompleted: task.isCompleted,
                description: task.description
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
  const updatedProject: ProjectDto = {
    id: projectId,
    name: project.name,
    description: project.description,
    workColumns: Object.values(project.columns).map(
      (column) =>
        ({
          id: column.id,
          name: column.title,
          position: project.columnOrder.indexOf(column.id),
          workItems: column.taskIds.map(
            (taskId) =>
              ({
                id: taskId,
                name: project.tasks[taskId].content,
                description: project.tasks[taskId].description,
                isCompleted: project.tasks[taskId].isCompleted,
                position: column.taskIds.indexOf(taskId),
                workColumnId: column.id
              } as WorkItemDto)
          )
        } as WorkColumnDto)
    )
  };

  return axios.put(`/projects`, updatedProject);
};

export const createTask = (item: WorkItemDto) => {
  return axios.post(`/items`, item);
};

export const updateTask = (item: WorkItemDto) => {
  return axios.put(`/items`, item);
};

export const deleteTask = (id: string) => {
  return axios.delete(`/items/${id}`);
};
