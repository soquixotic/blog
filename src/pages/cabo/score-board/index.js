import { useSearchParams } from "react-router-dom";
import { Flex, Table, Button, Modal, Divider, InputNumber } from "antd";
import { PLAYER_NUM_SUPPORT } from "../constant";
import { useCallback, useEffect, useState } from "react";

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

const { confirm } = Modal;


function CaboScoreBoard({ playerNum }) {
  const tableColumns = [
    {
      title: "🦄",
      dataIndex: "round",
      key: "round",
      width: 20,
    },
  ];
  const [dataSource, setDataSource] = useState([]);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [resultInfo, setResultInfo] = useState("");

  useEffect(() => {
    const scoreMap = {};
    dataSource.forEach((record) => {
      console.log(JSON.stringify(record));
      Object.keys(record).forEach((item) => {
        if (item === "round" || item === "key") {
          return;
        }
        if (!scoreMap[item]) {
          scoreMap[item] = 0;
        }
        scoreMap[item] += record[item];
      })
    })
    let scoreInfo = "";
    Object.keys(scoreMap).forEach((value, index) => {
      const score = scoreMap[value];
      scoreInfo += `${index+1}P:\t${score}`;
      if (score > 40) {
        scoreInfo +=  `\t(${100 - score} to 100)`;
      }
      scoreInfo += "\r\n";  
    })

    setResultInfo(scoreInfo);
  }, [dataSource])

  for (let index = 0; index < playerNum; index++) {
    const playerID = `player_${index + 1}`;
    tableColumns.push({
      title: `${index + 1}P`,
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

  const onRevokeScore = () => {
    dataSource.pop();
    setDataSource([...dataSource]);
  }

  const onRestartGame = () => {
    confirm({
      content: "Are you sure to restart the game? ",
      onOk() {
        setDataSource([]);
      }
    })
  }

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
        
        {dataSource.length > 0 && <Button type="default" onClick={onRevokeScore}>Revoke</Button>}
        {dataSource.length > 0 && <Button type="default" danger onClick={onRestartGame}>Restart</Button>}

      </Flex>
      <pre className="mb-4  ">{resultInfo}</pre>  
      <NewScoreModal
        playerNum={playerNum}
        open={openScoreModal}
        onOk={onAddNewRoundScore}
        onCancel={() => {
          setOpenScoreModal(false);
        }}
      />

      {dataSource.length > 0 && <Table
        className="w-full"
        columns={tableColumns}
        dataSource={dataSource}
        scroll={{ x: "max-content" }}
        pagination={false}
      ></Table>}
    </Flex>
  );
}

const NewScoreModal = ({ playerNum, onOk, onCancel, open }) => {
  const [playerScores, setScores] = useState({});
  const genEmptyScores = useCallback(() => {
    const scores = {};
    Array.from({ length: playerNum }).map((_, index) => {
      const playerID = `player_${index + 1}`;
      scores[playerID] = 0;
      return 0;
    });
    return scores;
  }, [playerNum]);
  useEffect(() => {
    setScores(genEmptyScores());
  }, [genEmptyScores]);

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
        setScores(genEmptyScores());
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
            <Flex key={playerID} className="items-center text-base">
              {playerName}
              <InputNumber
                className="ml-4"
                type="number"
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
