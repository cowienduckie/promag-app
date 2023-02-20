import { ButtonModal } from "@/components/button-modal";
import { useDisclosure } from "@/hooks/useDisclosure";
import { Button, Form, Input } from "antd";
import { IColumn } from "../../interfaces";
import { WorkItemDto } from "@/features/project/apis/types";
import { createTask } from "@/features/project/apis";
import TextArea from "antd/es/input/TextArea";

export const AddTaskModal = ({ column }: { column: IColumn }) => {
  const { isOpen, open, close } = useDisclosure(false);

  const onFinish = (values: any) => {
    const newTask: WorkItemDto = {
      id: "",
      name: values.name,
      description: values.description ?? "",
      isCompleted: false,
      position: column.taskIds.length + 1,
      workColumnId: column.id
    };

    createTask(newTask).finally(() => {
      close();
    });
  };

  const onFinishFailed = (errorInfo: unknown) => {
    alert(`Failed: ${errorInfo}`);
  };

  return (
    <ButtonModal
      isModalOpen={isOpen}
      buttonTitle="Add Task"
      modalTitle="Add New Task"
      buttonClassName="mt-5"
      handleOpen={open}
      handleCancel={close}
      footer={false}
    >
      <Form
        className="my-5"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input task name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: false }]}
        >
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="mr-2" type="primary" htmlType="submit">
            Submit
          </Button>
          <Button className="ml-2" type="default" onClick={close}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </ButtonModal>
  );
};
