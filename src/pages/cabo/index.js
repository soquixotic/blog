import { Flex, Button, Divider, Modal, Slider, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PLAYER_NUM_SUPPORT } from "./constant";

export default function CaboEntryPage() {
  const [openNewRoom, setOpenNewRoom] = useState(false);
  const [playerNum, setPlayerNum] = useState(4);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const showGameCreateModal = () => {
    setOpenNewRoom(false);
    console.log("player number: ", playerNum);
    navigate(`/cabo/board?playerNum=${playerNum}`);
  };
  const onPlayerNumberChange = (newNum) => {
    setPlayerNum(newNum);
  };
  return (
    <Flex className="justify-center h-screen mt-20">
      {contextHolder}
      <Flex
        vertical
        className=" items-center p-8 border border-gray-600 w-72 border-solid bg-white bg-opacity-80 h-fit"
      >
        <h1 className="text-lg font-bold">🦄 Cabo 🦄</h1>
        <Divider />
        <Button className="mb-4 w-36" onClick={() => setOpenNewRoom(true)}>
          New Room
        </Button>
        <Button
          className="w-36"
          onClick={() =>
            messageApi.error("The function is still under development")
          }
        >
          Check Room
        </Button>
      </Flex>
      <Modal
        open={openNewRoom}
        title="Please select the number of players:"
        centered
        confirmLoading={false}
        okText="OK"
        okType="primary"
        cancelText="Cancel"
        onOk={showGameCreateModal}
        onCancel={() => {
          setOpenNewRoom(false);
        }}
      >
        <div className="p-8">
          <Slider
            max={6}
            min={2}
            defaultValue={playerNum}
            marks={PLAYER_NUM_SUPPORT}
            onChange={onPlayerNumberChange}
          />
        </div>
      </Modal>
    </Flex>
  );
}
