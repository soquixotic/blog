import { Flex, Button } from "antd";
import { useNavigate } from "react-router-dom";

export function Homepage() {
  const navigate = useNavigate();
  return (
    <Flex vertical className="justify-center items-center p-16 w-full h-full">
      <h1>桌游列表</h1>
      <Button
        className="mt-16"
        onClick={() => {
          navigate("/cabo");
        }}
      >
        Cabo
      </Button>
    </Flex>
  );
}
