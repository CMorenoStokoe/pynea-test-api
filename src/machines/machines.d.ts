
/**
 * * Machine properties
 * Keys and typings for properties of a machine node
 */

export interface MachineProperties {
    machineId: string;
    type: string;
    capacity: string;
    status: 'unavailable' | 'available';
}