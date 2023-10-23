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
        <h1 className="text-lg font-bold">Function List</h1>
        <Divider />
        <Button
          className="mb-2"
          onClick={() => {
            navigate("/cabo");
          }}
        >
          Cabo
        </Button>
        <Button
          onClick={() => {
            navigate("/ai-editor");
          }}
        >
          AI Editor
        </Button>
      </Flex>
    </Flex>
  );
}
