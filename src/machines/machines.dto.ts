import { SweetProperties } from "../sweets/sweets";
import { MachineProperties } from "./machines";

/**
 * * Machines data transfer objects
 * Define the structure of data we expect from JSON payloads
 */

export class MachineDto {
    readonly machineId: MachineProperties['machineId'];
    readonly capacity: MachineProperties['capacity'];
    readonly status: MachineProperties['status'];
    readonly type: MachineProperties['type'];
};

export class MachineEdgeDto {
    readonly from: MachineProperties['machineId'];
    readonly to: SweetProperties['name'];
    readonly type: 'PRODUCES';
};
