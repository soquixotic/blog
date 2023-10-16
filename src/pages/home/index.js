import { Flex, Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";

export function Homepage() {
  const navigate = useNavigate();
  return (
    <Flex className="justify-center items-center h-full">
      <Flex
        vertical
        className="justify-center items-center p-8 border border-gray-600 w-72 border-solid"
      >
        <h1 className="text-lg font-bold">桌游列表</h1>
        <Divider />
        <Button
          onClick={() => {
            navigate("/cabo");
          }}
        >
          Cabo
        </Button>
      </Flex>
    </Flex>
  );
}
