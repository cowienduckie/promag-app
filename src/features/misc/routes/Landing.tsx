import { SendOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="m-auto flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-10 text-center text-4xl font-bold">
        Welcome to the landing page!
      </h1>
      <Link to="/app">
        <Button type="primary" size="large">
          Go to App <SendOutlined className="align-baseline" />
        </Button>
      </Link>
    </div>
  );
};
