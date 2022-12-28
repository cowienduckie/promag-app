import { getProjectById } from "@/features/project/apis";
import { Params } from "react-router-dom";

export const loader = async ({ params }: { params: Params<string> }) => {
  const { projectId } = params;

  const project = await getProjectById(projectId ?? "");

  return { project };
};
