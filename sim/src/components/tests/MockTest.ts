import { AlgoTestDataInterface } from ".";
import { ObstacleDirection } from "../structures/Obstacle";

export const AlgoTestOfficialMockLayout: AlgoTestDataInterface = {
  obstacles: [
    { id: 1, x: 2, y: 9, d: ObstacleDirection.E },
    { id: 2, x: 2, y: 15, d: ObstacleDirection.S },
    { id: 3, x: 15, y: 2, d: ObstacleDirection.N },
    { id: 4, x: 12, y: 12, d: ObstacleDirection.S },
    { id: 5, x: 18, y: 17, d: ObstacleDirection.W },
  ],
};
