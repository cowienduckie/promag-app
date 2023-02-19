import { ITask } from "@/features/project/interfaces";
import { Container } from "@/features/project/components/container";
import { Draggable } from "react-beautiful-dnd";
import { memo } from "react";
import { Button, Checkbox, Modal } from "antd";
import { useDisclosure } from "@/hooks/useDisclosure";
import { DeleteOutlined } from "@ant-design/icons";
import { useLoading } from "@/hooks/useLoading";
import { deleteTask } from "@/features/project/apis";

type TaskProps = {
  task: ITask;
  index: number;
};

const Task = (props: TaskProps) => {
  const { task, index, ...otherProps } = props;
  const { isOpen, open, close } = useDisclosure(false);
  const { isLoading, startLoading, endLoading } = useLoading(false);

  return (
    <>
      <Draggable
        draggableId={task.id}
        index={index}
        key={task.id}
        {...otherProps}
      >
        {(provided, snapshot) => (
          <Container
            className={`my-2 rounded p-4 ${
              snapshot.isDragging ? "bg-green-100" : "bg-white"
            }`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            onClick={() => open()}
          >
            <p>
              <strong>{task.content}</strong>
            </p>
            <Checkbox className="mt-5" checked={task.isCompleted}>
              Is Completed?
            </Checkbox>
          </Container>
        )}
      </Draggable>

      <Modal title="Task Details" onCancel={close} open={isOpen} footer={false}>
        <div className="w-100 rounded bg-blue-50 py-4 px-3">
          <h5 className=" text-xl">{task.content}</h5>
          <p className="my-3">
            <strong>Description:</strong> {task.description}
          </p>
          <Button
            className="mt-8"
            type="primary"
            icon={<DeleteOutlined className="align-text-top" />}
            loading={isLoading}
            onClick={() => {
              startLoading();
              deleteTask(task.id).finally(() => {
                endLoading();
                close();
              });
            }}
            danger
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default memo(Task);
