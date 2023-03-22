import { Button, Card, Drawer, Form, Select, Space } from "antd";
import { useContext, useState } from "react";
import {
  ActionType,
  IColumn,
  IProject,
  IRule,
  TriggerType
} from "@/features/project/types";
import { ProjectContext } from "@/features/project/contexts/projectContext";

enum Action {
  ViewRules = "VIEW_RULES",
  CreateRule = "CREATE_RULE"
}

export const CustomRuleDrawer = ({
  isOpen,
  close,
  project
}: {
  isOpen: boolean;
  close: () => void;
  project: IProject;
}) => {
  const [action, setAction] = useState<Action>(Action.ViewRules);
  const projectContext = useContext(ProjectContext);

  const handleCreateRule = (values: {
    triggerType: TriggerType;
    triggerValue: string;
    actionType: ActionType;
    actionValue: string;
  }) => {
    const updatedProject = {
      ...projectContext.project,
      customRules: [
        ...projectContext.project.customRules,
        {
          id: "rule-" + (projectContext.project.customRules.length + 1),
          triggerType: values.triggerType,
          triggerValue:
            values.triggerValue !== ""
              ? (JSON.parse(values.triggerValue) as IColumn)
              : "",
          actionType: values.actionType,
          actionValue:
            values.actionValue !== ""
              ? (JSON.parse(values.actionValue) as IColumn)
              : ""
        } as IRule
      ]
    } as IProject;
    projectContext.updateProject(updatedProject, null);
    setAction(Action.ViewRules);
  };

  const handleDeleteRule = (ruleId: string) => {
    const updatedProject = {
      ...projectContext.project,
      customRules: projectContext.project.customRules.filter(
        (rule) => rule.id !== ruleId
      )
    } as IProject;
    projectContext.updateProject(updatedProject, null);
  };

  return (
    <Drawer
      title={
        action === Action.ViewRules ? "Custom Rules List" : "Create new rule"
      }
      placement="right"
      width={500}
      onClose={close}
      open={isOpen}
      extra={
        <Space>
          {action === Action.ViewRules ? (
            <>
              <Button
                type="primary"
                onClick={() => {
                  setAction(Action.CreateRule);
                }}
              >
                Create new
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setAction(Action.ViewRules);
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </Space>
      }
      forceRender
    >
      {action === Action.ViewRules ? (
        <>
          {projectContext.project.customRules &&
            projectContext.project.customRules.map((rule) => (
              <Card className="my-2" key={rule.id} title={rule.id}>
                <p className="my-2">Trigger Type: {rule.triggerType}</p>
                {typeof rule.triggerValue !== "string" && (
                  <p className="my-2">
                    Trigger Value: {rule.triggerValue.name}
                  </p>
                )}
                <p className="my-2">Action Type: {rule.actionType}</p>
                {typeof rule.actionValue !== "string" && (
                  <p className="my-2">Action Value: {rule.actionValue.name}</p>
                )}
                <Button
                  className={"mt-4"}
                  type="primary"
                  danger
                  onClick={() => handleDeleteRule(rule.id)}
                >
                  Delete Rule
                </Button>
              </Card>
            ))}
        </>
      ) : (
        <Form
          className="my-5"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleCreateRule}
          autoComplete="off"
        >
          <Form.Item label="Trigger Type" name="triggerType" required>
            <Select>
              <Select.Option value={TriggerType.MarkAsComplete}>
                Mark as complete
              </Select.Option>
              <Select.Option value={TriggerType.MarkAsIncomplete}>
                Mark as incomplete
              </Select.Option>
              <Select.Option value={TriggerType.MoveToColumn}>
                Move to column
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Trigger Value" name="triggerValue" initialValue="">
            <Select>
              <Select.Option value="">[None]</Select.Option>
              {projectContext.project.columnOrder.map((columnId) => (
                <Select.Option
                  key={columnId}
                  value={JSON.stringify(
                    projectContext.project.columns[columnId]
                  )}
                >
                  {projectContext.project.columns[columnId].name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Action Type" name="actionType" required>
            <Select>
              <Select.Option value={ActionType.MarkAsComplete}>
                Mark as complete
              </Select.Option>
              <Select.Option value={ActionType.MarkAsIncomplete}>
                Mark as incomplete
              </Select.Option>
              <Select.Option value={ActionType.MoveToColumn}>
                Move to column
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Action Value" name="actionValue" initialValue="">
            <Select>
              <Select.Option value="">[None]</Select.Option>
              {projectContext.project.columnOrder.map((columnId) => (
                <Select.Option
                  key={columnId}
                  value={JSON.stringify(
                    projectContext.project.columns[columnId]
                  )}
                >
                  {projectContext.project.columns[columnId].name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              className="mt-5 ml-5 bg-green-500"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
};
