import { Obstacle } from "../structures/Obstacle";
import { AlgoTestCustom } from "./CustomTest";


import { AlgoTestOfficialMockLayout } from "./MockTest";

/** Interface for Algorithm Test Data
 * @param obstacles An array of Obstacles.
 */
export interface AlgoTestDataInterface {
  obstacles: Obstacle[];
}

export enum AlgoTestEnum {
  Custom = "Custom",
  AlgoTestOfficialMockLayout = "Mock",
}

export const AlgoTestEnumsList = [
  AlgoTestEnum.Custom,
  AlgoTestEnum.AlgoTestOfficialMockLayout,
];

export const AlgoTestEnumMapper = {
  [AlgoTestEnum.Custom]: AlgoTestCustom,
  [AlgoTestEnum.AlgoTestOfficialMockLayout]: AlgoTestOfficialMockLayout,
};

export { AlgoTestOfficialMockLayout } from "./MockTest";
