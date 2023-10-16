import { useSearchParams } from "react-router-dom";
import { Flex, Table, Button, Modal, Divider, InputNumber } from "antd";
import { PLAYER_NUM_SUPPORT } from "../constant";
import { useEffect, useState } from "react";

export function CaboScoreBoardPage() {
  const [params] = useSearchParams();
  const playerNum = params.get("playerNum");

  if (!Object.keys(PLAYER_NUM_SUPPORT).includes(playerNum)) {
    return (
      <Flex className="justify-center items-center">
        Player num is incorrect
      </Flex>
    );
  }

  return (
    <Flex>
      <CaboScoreBoard playerNum={playerNum} />
    </Flex>
  );
}

function CaboScoreBoard({ playerNum }) {
  const tableColumns = [
    {
      title: "Rounds",
      dataIndex: "round",
      key: "round",
    },
  ];
  const [dataSource, setDataSource] = useState([]);
  const [openScoreModal, setOpenScoreModal] = useState(false);

  for (let index = 0; index < playerNum; index++) {
    const playerID = `player_${index + 1}`;
    tableColumns.push({
      title: `Player ${index + 1}`,
      dataIndex: playerID,
      key: playerID,
    });
  }

  const onAddNewRoundScore = (playerScores) => {
    const newRoundScore = {
      round: dataSource.length + 1,
      key: `score_${dataSource.length + 1}`,
    };
    console.log("player scores", playerScores);
    for (let index = 0; index < Object.keys(playerScores).length; index++) {
      const playerID = `player_${index + 1}`;
      newRoundScore[playerID] = playerScores[playerID] ?? 0;
    }
    dataSource.push(newRoundScore);
    setDataSource([...dataSource]);
    setOpenScoreModal(false);
  };

  return (
    <Flex className="w-full h-full p-4" vertical>
      <h2 className="text-lg mb-4">Score board Actions</h2>
      <Flex className="mb-4 space-x-4">
        <Button
          type="primary"
          onClick={() => {
            setOpenScoreModal(true);
          }}
        >
          Record score
        </Button>
        <Button type="default">Analyze</Button>
      </Flex>
      <NewScoreModal
        playerNum={playerNum}
        open={openScoreModal}
        onOk={onAddNewRoundScore}
        onCancel={() => {
          setOpenScoreModal(false);
        }}
      />

      <Table
        className="w-full"
        columns={tableColumns}
        dataSource={dataSource}
      ></Table>
    </Flex>
  );
}

const NewScoreModal = ({ playerNum, onOk, onCancel, open }) => {
  const [playerScores, setScores] = useState({});
  useEffect(() => {
    const scores = {};
    Array.from({ length: playerNum }).map((_, index) => {
      const playerID = `player_${index + 1}`;
      scores[playerID] = 0;
    });
    setScores({ ...scores });
  }, [playerNum]);

  const onNewScoreValueChanged = (id, value) => {
    playerScores[id] = value;
    setScores({ ...playerScores });
  };
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={() => {
        onOk(playerScores);
        const scores = {};
        Array.from({ length: playerNum }).map((_, index) => {
          const playerID = `player_${index + 1}`;
          scores[playerID] = 0;
        });
        setScores({ ...scores });
      }}
      title="Record new round score:"
    >
      <Flex vertical className="space-y-2">
        <Divider />
        {Array.from({ length: playerNum }).map((_, index) => {
          const playerID = `player_${index + 1}`;
          const playerName = `Player ${index + 1}`;
          const score = playerScores[playerID] ?? 0;
          return (
            <Flex key={playerID} className="items-center">
              {playerName}
              <InputNumber
                className="ml-4"
                min={0}
                max={50}
                value={score}
                onChange={(value) => {
                  onNewScoreValueChanged(playerID, value);
                }}
              />
            </Flex>
          );
        })}
      </Flex>
    </Modal>
  );
};
