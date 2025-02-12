import { Obstacle } from "./Obstacle";

export enum AlgoType {
  EXHAUSTIVE_ASTAR = "Exhaustive Astar",
}

export const AlgoTypeList = [
  AlgoType.EXHAUSTIVE_ASTAR,
];

export interface AlgoInput {
  cat: "obstacles";
  value: {
    obstacles: Obstacle[];
    mode: 0; // 0: Task 1
  };
  server_mode: "simulator";
  algo_type: AlgoType;
}