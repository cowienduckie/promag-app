import { axios } from "@/lib/axios";
import { IProject } from "../types";

export const getProjectById = (projectId: string): Promise<IProject> => {
  return axios(`/projects/${projectId}`);
};

export const getProjects = (): Promise<IProject[]> => {
  return axios(`/projects`);
};

export const updateProject = (projectId: string, project: IProject) => {
  return axios.put(`/projects/${projectId}`, project);
};
