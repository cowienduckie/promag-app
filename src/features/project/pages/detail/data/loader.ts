import { getProjectById } from "@/features/project/apis";
import { Params } from "react-router-dom";
import { LoaderData } from "../interface";

export const loader = async ({
  params
}: {
  params: Params<string>;
}): Promise<LoaderData> => {
  const { projectId } = params;

  const project = await getProjectById(projectId ?? "");

  return { project };
};
