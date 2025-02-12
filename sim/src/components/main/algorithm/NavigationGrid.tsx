import React from "react";
import { Position } from "../../structures/Robot";
import { Obstacle } from "../../structures/Obstacle";
import { addHTMLGridLables, createHTMLGrid } from "./misc/Grid";
import { AlgoTestDataInterface } from "../../tests";
import { ObstacleDirection } from "../../structures/Obstacle";

interface NavigationGridProps {
  robotPosition: Position;
  obstacles: Obstacle[];
  canAddObstacle: boolean;
  setSelectedTest: React.Dispatch<React.SetStateAction<AlgoTestDataInterface>>;
  selectedObstacleDirection: ObstacleDirection;
}

export const NavigationGrid = (props: NavigationGridProps) => {
  const { robotPosition, obstacles, canAddObstacle, setSelectedTest, selectedObstacleDirection  } = props;

  const handleAddObstacle = (x: number, y: number, d: number) => {
    setSelectedTest((prev) => {
      const updated = {
        obstacles: [
          ...prev.obstacles,
          {
            id: prev.obstacles.length,
            x: x,
            y: y,
            d: d,
          },
        ],
      };
      return updated;
    });
  };
  const handleChangeObstacleDirection = (
    x: number,
    y: number,
    new_d: number
  ) => {
    setSelectedTest((prev) => {
      const obstacleToChange = prev.obstacles.filter(
        (o) => o.x === x && o.y === y
      )[0];
      const remainingObstacles = prev.obstacles.filter(
        (o) => o.x !== x || o.y !== y
      );
      const updated = {
        obstacles: [
          ...remainingObstacles,
          {
            id: obstacleToChange.id,
            x: obstacleToChange.x,
            y: obstacleToChange.y,
            d: new_d,
          },
        ],
      };
      return updated;
    });
  };

  const grid = createHTMLGrid(
    robotPosition,
    obstacles,
    canAddObstacle,
    handleAddObstacle,
    handleChangeObstacleDirection,
    selectedObstacleDirection // Pass to Grid.tsx

  );
  addHTMLGridLables(grid);

  return (
    <div>
      {/* Grid */}
      <table>
        <tbody>
          {grid.map((row) => {
            return <tr>{row.map((column) => column)}</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};