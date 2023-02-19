import { ButtonModal } from "@/components/button-modal";
import { useDisclosure } from "@/hooks/useDisclosure";
import { Button, Form, Input } from "antd";
import { IColumn } from "../../interfaces";

export const AddTaskModal = ({ column }: { column: IColumn }) => {
  const { isOpen, open, close } = useDisclosure(false);

  const onFinish = (values: unknown) => {
    console.log("Success:", values);
    //close();
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
          name="content"
          rules={[{ required: true, message: "Please input task name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Column"
          name="column"
          initialValue={column.id}
          rules={[{ required: true }]}
          hidden
        >
          <Input disabled />
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
