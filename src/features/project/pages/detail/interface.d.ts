import { IProject } from "../../interfaces";

export interface LoaderData {
  promise: Promise<IProject>;
  project: IProject;
}
