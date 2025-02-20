import { Obstacle } from "../structures/Obstacle";
import { AlgoTestCustom } from "./CustomTest";


import { AlgoTestOfficialMockLayout } from "./MockTest";
import { AlgoTestOfficialMockLayout2 } from "./MockTest2";
import { AlgoTestOfficialMockLayout3 } from "./MockTest3";


/** Interface for Algorithm Test Data
 * @param obstacles An array of Obstacles.
 */
export interface AlgoTestDataInterface {
  obstacles: Obstacle[];
}

export enum AlgoTestEnum {
  Custom = "Custom",
  AlgoTestOfficialMockLayout = "Layout 1",
  AlgoTestOfficialMockLayout2 = "Layout 2",
  AlgoTestOfficialMockLayout3 = "Layout 3",
}

export const AlgoTestEnumsList = [
  AlgoTestEnum.Custom,
  AlgoTestEnum.AlgoTestOfficialMockLayout,
  AlgoTestEnum.AlgoTestOfficialMockLayout2,
  AlgoTestEnum.AlgoTestOfficialMockLayout3,
];

export const AlgoTestEnumMapper = {
  [AlgoTestEnum.Custom]: AlgoTestCustom,
  [AlgoTestEnum.AlgoTestOfficialMockLayout]: AlgoTestOfficialMockLayout,
  [AlgoTestEnum.AlgoTestOfficialMockLayout2]: AlgoTestOfficialMockLayout2,
  [AlgoTestEnum.AlgoTestOfficialMockLayout3]: AlgoTestOfficialMockLayout3,
};

export { AlgoTestOfficialMockLayout } from "./MockTest";
