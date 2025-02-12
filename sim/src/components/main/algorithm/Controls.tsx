import React, { useState } from "react";
import { Button, PanelContainer } from "../../default";
import { SiSpeedtest } from "react-icons/si";
import {
  FaBox,
  FaCheckSquare,
  FaCircle,
  FaPlus,
  FaSquare,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  AlgoTestDataInterface,
  AlgoTestEnum,
  AlgoTestEnumsList,
} from "../../tests";
import {
  Obstacle,
  ObstacleDirection,
  ObstacleDirectionStringMapping,
} from "../../structures/Obstacle";
import toast from "react-hot-toast";
import { ROBOT_GRID_HEIGHT, ROBOT_GRID_WIDTH } from "../../../constants";

interface TestSelectorProps {
  selectedTestEnum: AlgoTestEnum;
  setSelectedTestEnum: React.Dispatch<React.SetStateAction<AlgoTestEnum>>;
  selectedTest: AlgoTestDataInterface; // For Managing Custom Obstacles
  setSelectedTest: React.Dispatch<React.SetStateAction<AlgoTestDataInterface>>; // For Managing Custom Obstacles
  setAlgoRuntime: React.Dispatch<string>; // For reseting AlgoRuntime when changing the test
  setSelectedObstacleDirection: React.Dispatch<React.SetStateAction<ObstacleDirection>>;
}

export const TestSelector = (props: TestSelectorProps) => {
  const {
    selectedTestEnum,
    setSelectedTestEnum,
    selectedTest,
    setSelectedTest,
    setAlgoRuntime,
  } = props;

  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  // Custom Obstacle
  const [isManageObstaclesModalOpen, setIsManageObstaclesModalOpen] =
    useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [customObstacle_X, setCustomObstacle_X] = useState<number>(0);
  const [customObstacle_Y, setCustomObstacle_Y] = useState<number>(0);
  const [customObstacle_Direction, setCustomObstacle_Direction] =
    useState<ObstacleDirection>(ObstacleDirection.N);
  const handleAddCustomObstacle = () => {
    // Check that cell is not occupied by Robot
    if (
      0 <= customObstacle_X &&
      customObstacle_X <= ROBOT_GRID_WIDTH - 1 &&
      0 <= customObstacle_Y &&
      customObstacle_Y <= ROBOT_GRID_HEIGHT - 1
    ) {
      return toast.error("Cell is occupied by the Robot!");
    }
    // Check that cell is not occupied by existing Obstacle
    if (
      selectedTest.obstacles.filter(
        (o) => o.x === customObstacle_X && o.y === customObstacle_Y
      ).length > 0
    ) {
      return toast.error("Cell is already occupied by an Obstacle!");
    }

    const updated = {
      obstacles: [
        ...selectedTest.obstacles,
        {
          id: selectedTest.obstacles.length,
          x: customObstacle_X,
          y: customObstacle_Y,
          d: customObstacle_Direction,
        },
      ],
    };
    setSelectedTest(updated);
  };

  const handleResetObstacles = () => {
    setSelectedTest({ ...selectedTest, obstacles: [] });
    toast.success("Obstacles reset successfully.");
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      
    {/* Button Dropdown */}
    <div className="mb-5">
    <Button
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="w-max flex items-center gap-2 px-4 py-2 bg-blue-900 rounded font-bold text-white text-[14px] shadow-lg hover:text-orange-300 cursor-pointer"

    >
      <span>Select Test - {selectedTestEnum}</span>
      <SiSpeedtest className="w-[18px] h-[18px]" />
    </Button>
    </div>

      {/* Dropdown Menu */}
  {isDropdownOpen && (
    <div className="absolute z-50 mt-2 w-full bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden">
      {AlgoTestEnumsList.map((algoTest) => (
        <div
          key={algoTest}
          onClick={() => {
            setSelectedTestEnum(algoTest);
            setIsDropdownOpen(false);
            setAlgoRuntime(""); // Reset algo runtime when test changes
          }}
          className={`px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white ${
            algoTest === selectedTestEnum ? "bg-blue-200 font-bold" : ""
          }`}
        >
          {algoTest}
        </div>
      ))}
    </div>
  )}


      {isManageObstaclesModalOpen && 
        <PanelContainer
          title="Manage Obstacles"
          onClose={() => setIsManageObstaclesModalOpen(false)}
        >
          <div className="flex flex-col justify-center items-start">
           

            {/* Add Obstacle */}
            <div className="w-full flex flex-col justify-center items-center mt-4">
              {/* Title */}
             
{/* X and Y Coordinate Selection - Side by Side */}
<div className="flex gap-4 items-center my-2">
  {/* X Coordinate */}
  <div className="flex flex-col items-center">
    <label className="font-bold mb-1">X Axis:</label>
    <select
      value={customObstacle_X}
      onChange={(e) => setCustomObstacle_X(Number(e.target.value))}
      className="border rounded-md p-1 bg-white w-20 text-center shadow-md focus:outline-none max-h-[200px] overflow-auto"
    >
      {Array.from({ length: 20 }, (_, i) => (
        <option key={i} value={i}>
          {i}
        </option>
      ))}
    </select>
  </div>

  {/* Y Coordinate */}
  <div className="flex flex-col items-center">
    <label className="font-bold mb-1">Y Axis:</label>
    <select
      value={customObstacle_Y}
      onChange={(e) => setCustomObstacle_Y(Number(e.target.value))}
      className="border rounded-md p-1 bg-white w-20 text-center shadow-md focus:outline-none max-h-[200px] overflow-auto"
    >
      {Array.from({ length: 20 }, (_, i) => (
        <option key={i} value={i}>
          {i}
        </option>
      ))}
    </select>
  </div>
</div>


    {/* Direction - Arranged in a Grid Layout */}
    <div className="grid grid-cols-3 grid-rows-3 gap-2 my-4 place-items-center">
    <div></div>
    <Button
      className={`w-16 h-16 text-lg font-bold flex items-center justify-center border-2 rounded-full transition-all duration-200 shadow-lg 
        ${customObstacle_Direction === 1  ? "bg-blue-500 text-white scale-110" : "bg-gray-300 text-black hover:bg-blue-400 hover:text-white"}`}
      onClick={() => setCustomObstacle_Direction(ObstacleDirection.N)}
    >
      N
    </Button>
    <div></div>

    <Button
      className={`w-16 h-16 text-lg font-bold flex items-center justify-center border-2 rounded-full transition-all duration-200 shadow-lg 
        ${customObstacle_Direction === ObstacleDirection.W ? "bg-blue-500 text-white scale-110" : "bg-gray-300 text-black hover:bg-blue-400 hover:text-white"}`}
      onClick={() => setCustomObstacle_Direction(ObstacleDirection.W)}
    >
      W
    </Button>

    <div className="w-16 h-16"></div>

    <Button
      className={`w-16 h-16 text-lg font-bold flex items-center justify-center border-2 rounded-full transition-all duration-200 shadow-lg 
        ${customObstacle_Direction === ObstacleDirection.E ? "bg-blue-500 text-white scale-110" : "bg-gray-300 text-black hover:bg-blue-400 hover:text-white"}`}
      onClick={() => setCustomObstacle_Direction(ObstacleDirection.E)}
    >
      E
    </Button>

    <div></div>
    <Button
      className={`w-16 h-16 text-lg font-bold flex items-center justify-center border-2 rounded-full transition-all duration-200 shadow-lg 
        ${customObstacle_Direction === ObstacleDirection.S ? "bg-blue-500 text-white scale-110" : "bg-gray-300 text-black hover:bg-blue-400 hover:text-white"}`}
      onClick={() => setCustomObstacle_Direction(ObstacleDirection.S)}
    >
      S
    </Button>
    <div></div>
  </div>




              {/* Add Obstacle Button */}
              <Button onClick={handleAddCustomObstacle} 
      className="w-max flex items-center gap-2 px-4 py-2 bg-blue-900 rounded font-bold text-white text-[14px] shadow-lg hover:text-orange-300 cursor-pointer"

>
                <span>Add Obstacle</span>
                <FaPlus />
              </Button>

               {/* Reset Obstacles Button */}
               <Button
                onClick={handleResetObstacles}
                className="w-max flex items-center gap-2 px-4 py-2 mt-2 bg-red-600 rounded font-bold text-white text-[14px] shadow-lg hover:bg-red-500 cursor-pointer"
              >
                <span>Reset Obstacles</span>
                <MdDelete />
              </Button>
            </div>
          </div>
        </PanelContainer>
      }

      {/* Test Modal */}
      {isTestModalOpen && (
        <PanelContainer title="Tests" onClose={() => setIsTestModalOpen(false)}>
          <div className="flex flex-col items-start gap-2">
            {AlgoTestEnumsList.map((algoTest) => (
              <TestItem
                key={algoTest}
                test={algoTest}
                isSelected={algoTest === selectedTestEnum}
                setSelectedTestEnum={setSelectedTestEnum}
                setIsTestModalOpen={setIsTestModalOpen}
                setAlgoRuntime={setAlgoRuntime}
              />
            ))}
          </div>
        </PanelContainer>
      )}
    </div>
  );
};

interface TestItemProps {
  test: AlgoTestEnum;
  isSelected?: boolean;
  setSelectedTestEnum: React.Dispatch<React.SetStateAction<AlgoTestEnum>>;
  setIsTestModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlgoRuntime: React.Dispatch<string>; // For reseting AlgoRuntime when changing the test
}

const TestItem = (props: TestItemProps) => {
  const {
    test,
    isSelected = false,
    setSelectedTestEnum,
    setIsTestModalOpen,
    setAlgoRuntime,
  } = props;

  return (
    <div
      className="group/test flex gap-2 items-center justify-center cursor-pointer"
      onClick={() => {
        setSelectedTestEnum(test);
        setIsTestModalOpen(false);
        setAlgoRuntime("");
      }}
    >
      {isSelected ? (
        <FaCheckSquare />
      ) : (
        <>
          <FaCheckSquare className="hidden group-hover/test:inline" />
          <FaSquare className="inline group-hover/test:hidden" />
        </>
      )}
      <div
        className={`${isSelected && "font-bold"} group-hover/test:font-bold`}
      >
        {test}
      </div>
    </div>
  );
};

interface CustomObstacleItemProps {
  obstacle: Obstacle;
  setSelectedTest: React.Dispatch<React.SetStateAction<AlgoTestDataInterface>>;
}

const CustomObstacleItem = (props: CustomObstacleItemProps) => {
  const { setSelectedTest, obstacle } = props;
  const { x, y, d } = obstacle;

  const handleRemoveObstacle = () => {
    setSelectedTest((prev) => {
      const cleanedObstacles = prev.obstacles.filter(
        (o) => !(o.x === obstacle.x && o.y === obstacle.y)
      );

      return {
        obstacles: cleanedObstacles,
      };
    });
  };

 
};