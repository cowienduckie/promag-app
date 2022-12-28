import { axios } from "@/lib/axios";
import { IProject } from "../types";

export const getProjectById = (projectId: string): Promise<IProject> => {
  return axios(`/projects/${projectId}`);
};
