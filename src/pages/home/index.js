import { Flex, Button } from "antd";
import { useNavigate } from "react-router-dom";

export function Homepage() {
  const navigate = useNavigate();
  return (
    <Flex vertical>
      <h1>桌游列表</h1>
      <Button
        onClick={() => {
          navigate("/cabo");
        }}
      >
        Cabo
      </Button>
    </Flex>
  );
}
