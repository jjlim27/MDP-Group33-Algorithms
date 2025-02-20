import { AlgoTestDataInterface } from ".";
import { ObstacleDirection } from "../structures/Obstacle";

export const AlgoTestOfficialMockLayout3: AlgoTestDataInterface = {
  obstacles: [
    { id: 1, x: 7, y: 19, d: ObstacleDirection.S },
    { id: 2, x: 6, y: 2, d: ObstacleDirection.N },
    { id: 3, x: 1, y: 15, d: ObstacleDirection.S },
    { id: 4, x: 18, y: 12, d: ObstacleDirection.W },
    { id: 5, x: 18, y: 6, d: ObstacleDirection.W },
  ],
};
