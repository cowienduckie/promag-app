import { CardDeck } from "@/components/card-deck";
import { Card } from "antd";
import { NavLink, useLoaderData } from "react-router-dom";
import { LoaderData } from "../interface";

export const ProjectListPage = () => {
  const { projects } = useLoaderData() as LoaderData;

  const projectCards = projects.map((project) => (
    <Card
      key={project.id}
      title={
        <p className="text-xl font-bold">{project.name.toLocaleUpperCase()}</p>
      }
      className="border-2"
    >
      <p className="mb-2 text-lg">
        <strong>ID: </strong> {project.id}
      </p>
      <p className="mb-2 text-lg">
        <strong>Name: </strong> {project.name}
      </p>
      <NavLink
        className="mt-4 text-lg"
        to={`/app/projects/detail/${project.id}`}
      >
        View project details
      </NavLink>
    </Card>
  ));

  return (
    <div className="m-6 h-full">
      <h1 className="mb-5 text-2xl font-bold">PROJECT LIST</h1>
      <CardDeck className="py-5" cards={projectCards} colNum={4} hGutter={24} />
    </div>
  );
};
