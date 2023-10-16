import { Flex, Button } from "antd";

export function CaboEntryPage() {
  return (
    <Flex vertical className="justify-center items-center p-16 w-full h-full">
      <h1 className="text-lg font-bold">🦄 Cabo 🦄</h1>
      <Button className="mt-16 mb-8">创建房间</Button>
      <Button>查看房间</Button>
    </Flex>
  );
}

