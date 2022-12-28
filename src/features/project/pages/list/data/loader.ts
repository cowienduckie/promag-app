import { getProjects } from "@/features/project/apis";
import { LoaderData } from "../interface";

export const loader = async (): Promise<LoaderData> => {
  const projects = await getProjects();

  return { projects };
};
