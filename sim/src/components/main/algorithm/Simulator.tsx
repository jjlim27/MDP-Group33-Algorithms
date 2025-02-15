import React, { useEffect, useState } from "react";
import { NavigationGrid } from "./NavigationGrid";
import { MainContainer } from "../../default/MainContainer";
import { Position } from "../../structures/Robot";
import { ObstacleDirection } from "../../structures/Obstacle"
import {
  ALGO_GRID_BLOCK_SIZE_MULTIPLIER,
  GRID_ANIMATION_SPEED,
  ROBOT_INITIAL_POSITION,
} from "../../../constants";
import {
  FaPause,
  FaPlay,
  FaSitemap,
  FaSpinner,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { convertAlgoOutputToStepwisePosition } from "./misc/Movement";
import {
  AlgoTestDataInterface,
  AlgoTestEnum,
  AlgoTestEnumMapper,
} from "../../tests";
import { Button } from "../../default";
import toast from "react-hot-toast";
import { TestSelector } from "./Controls";
import { ServerStatus } from "./OnlineStatus";
import useFetch from "../../hooks/useFetch";
import { AlgoInput, AlgoType } from "../../structures/APIPass";
import { AlgoOutput } from "../../structures/APIReceive";

export const Algorithm = () => {
  const fetch = useFetch();
  const [robotPositions, setRobotPositions] = useState<Position[]>();
  const [selectedObstacleDirection, setSelectedObstacleDirection] = useState<ObstacleDirection>(ObstacleDirection.N);
  const totalSteps = robotPositions?.length ?? 0;
  const [currentStep, setCurrentStep] = useState(0);
  const [currentRobotPosition, setCurrentRobotPosition] = useState<Position>(ROBOT_INITIAL_POSITION);
  const [startAnimation, setStartAnimation] = useState(false);
  const [isManualAnimation, setIsManualAnimation] = useState(false);
  const [isAlgorithmLoading, setIsAlgorithmLoading] = useState(false);
  const [algoRuntime, setAlgoRuntime] = useState<string>("");
  const [selectedAlgoTypeEnum, setSelectedAlgoTypeEnum] = useState<AlgoType>(AlgoType.EXHAUSTIVE_ASTAR);
  const [selectedTestEnum, setSelectedTestEnum] = useState<AlgoTestEnum>(AlgoTestEnum.Custom);
  const [selectedTest, setSelectedTest] = useState<AlgoTestDataInterface>(AlgoTestEnumMapper[AlgoTestEnum.Custom]);
  const [showStepCounter, setShowStepCounter] = useState(false);

  useEffect(() => {
    const selectedTest = AlgoTestEnumMapper[selectedTestEnum];
    setSelectedTest(selectedTest);
    setCurrentStep(0);
    setCurrentRobotPosition(ROBOT_INITIAL_POSITION);
    setRobotPositions(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTestEnum]);

  const handleRunAlgorithm = async () => {
    if (startAnimation || isAlgorithmLoading) return;
    setIsAlgorithmLoading(true);
    setAlgoRuntime("");
    setShowStepCounter(true);

    const algoInput: AlgoInput = {
      cat: "obstacles",
      value: {
        mode: 0,
        obstacles: selectedTest.obstacles.map((o) => ({
          id: o.id,
          x: o.x * ALGO_GRID_BLOCK_SIZE_MULTIPLIER,
          y: o.y * ALGO_GRID_BLOCK_SIZE_MULTIPLIER,
          d: o.d,
        })),
      },
      server_mode: "simulator",
      algo_type: selectedAlgoTypeEnum,
    };

    try {
      const algoOutput: AlgoOutput = await fetch.post("/algo/simulator", algoInput);
      setRobotPositions(
        convertAlgoOutputToStepwisePosition(algoOutput.positions)
      );
      setCurrentStep(0);
      setAlgoRuntime(algoOutput.runtime);
      toast.success("Algorithm ran successfully.");
    } catch (e) {
      toast.error("Failed to run algorithm. Server Error: " + e);
    }

    setIsAlgorithmLoading(false);
  };

  // Animation
  useEffect(() => {
    if (robotPositions && startAnimation && currentStep + 1 < totalSteps) {
      const timer = setTimeout(() => {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);

        // Handle Scan Animation
        if (
          robotPositions[nextStep].x === -1 &&
          robotPositions[nextStep].y === -1
        ) {
          if (robotPositions[nextStep].theta === -1)
            toast.success("Image Scanned!");
        } else {
          setCurrentRobotPosition(robotPositions[nextStep]);
        }

        // Stop Animation at the last step
        if (nextStep === totalSteps - 1) {
          setStartAnimation(false);
        }
      }, GRID_ANIMATION_SPEED);
      return () => clearTimeout(timer);
    } else if (
      robotPositions &&
      isManualAnimation &&
      currentStep < totalSteps
    ) {
      // User manually click through the steps
      // Handle Scan Animation
      if (
        robotPositions[currentStep].x === -1 &&
        robotPositions[currentStep].y === -1
      ) {
        if (robotPositions[currentStep].theta === -1)
          toast.success("Image Scanned!");
       
      } else {
        setCurrentRobotPosition(robotPositions[currentStep]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, totalSteps, startAnimation, isManualAnimation]);

  return (
    <MainContainer title="Algorithm Simulator">
      <div className="flex">
        {/* Navigation Grid */}
        <NavigationGrid
          robotPosition={currentRobotPosition ?? ROBOT_INITIAL_POSITION}
          obstacles={selectedTest.obstacles}
          canAddObstacle={selectedTestEnum === AlgoTestEnum.Custom}
          setSelectedTest={setSelectedTest}
          selectedObstacleDirection={selectedObstacleDirection}

        />

        <div className="control-panel flex flex-col gap-3 items-center ml-5 p-3 border-2 border-gray-400 rounded-lg bg-white shadow-md w-100">
          <ServerStatus />

          <TestSelector
            selectedTestEnum={selectedTestEnum}
            setSelectedTestEnum={setSelectedTestEnum}
            selectedTest={selectedTest}
            setSelectedTest={setSelectedTest}
            setAlgoRuntime={setAlgoRuntime}
            setSelectedObstacleDirection={setSelectedObstacleDirection} // Pass state setter

          />

          <Button
            onClick={handleRunAlgorithm}
            className="w-full py-4 gap-2 px-6 text-lg font-bold flex items-center justify-center bg-blue-900 text-white rounded-md shadow-lg hover:bg-blue-700 transition"
          >
            <FaSitemap className="w-4 h-4" />
            <span>Run Algorithm</span>
            {isAlgorithmLoading ? <FaSpinner className="animate-spin" /> : <FaSitemap className="text-[18px]" />}
          </Button>

          {algoRuntime && <div className="text-center font-bold">Algorithm Runtime: {algoRuntime}</div>}

          {showStepCounter && (
            <div className="flex items-center gap-4">
              <button
                className="bg-blue-700 text-white p-2 rounded"
                onClick={() => setStartAnimation(!startAnimation)}
              >
                {startAnimation ? <FaPause /> : <FaPlay />}
              </button>

              <button
                className={`p-2 rounded ${currentStep > 0 ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-500"}`}
                onClick={() => {
                  if (!startAnimation && currentStep - 1 >= 0) {
                    setIsManualAnimation(true);
                    setCurrentStep((prev) => prev - 1);
                  }
                }}
                disabled={currentStep <= 0}
              >
                <FaArrowLeft className="w-6 h-6" />
              </button>

              <span>Step: {currentStep + 1} / {totalSteps}</span>

              <button
                className={`p-2 rounded ${currentStep < totalSteps - 1 ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-500"}`}
                onClick={() => {
                  if (!startAnimation && currentStep + 1 < totalSteps) {
                    setIsManualAnimation(true);
                    setCurrentStep((prev) => prev + 1);
                  }
                }}
                disabled={currentStep >= totalSteps - 1}
              >
                <FaArrowRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </MainContainer>
  );
};
