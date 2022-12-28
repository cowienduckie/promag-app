import { axios } from "@/lib/axios";
import { ProjectType } from "../types";

export const getProjectById = (projectId: string): Promise<ProjectType> => {
  return axios(`/projects/${projectId}`);
};
