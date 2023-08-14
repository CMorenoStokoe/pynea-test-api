import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MachineDto, MachineEdgeDto } from './machines.dto';
import { MachinesService } from './machines.service';
import { SweetProperties } from '../sweets/sweets';

@Controller('machines')
export class MachinesController {
    constructor(private readonly machinesService: MachinesService) { }

    /**
   * * Get machines by production
   * Returns all machines producing containing a given sweet
   * @param sweet <string> Name of a sweet the machine produces, provided as a URL parameter
   */

    @Get('producing/:sweet')
    findNodesByRelationship(
        @Param('sweet') sweet: SweetProperties['name']
    ) {
        return this.machinesService.getMachinesProducingSweet(sweet);
    }

    /**
     * * New machine
     * Creates a new machine node with given properties
     * @param Body <JSON> Expects properties to be provided as a JSON payload in the body of the request
     */

    @Post()
    insertNewNode(
        @Body() { machineId, capacity, type, status }: MachineDto
    ) {
        return this.machinesService.addMachine({ machineId, capacity, type, status })
    }

    /**
     * * New relationship
     * Creates a new relationship between machine and a sweet it produces
     * @param machine <number> Id of the machine that produces the sweet
     * @param sweet <string> Name of the sweet produced by the machine
     */

    // todo: Strictly should be a POST even though we don't send a payload

    @Get(':machine/nowProduces/:sweet')
    insertNewEdge(
        @Param('machine') from: MachineEdgeDto['from'],
        @Param('sweet') to: MachineEdgeDto['to']
    ) {
        return this.machinesService.addRelationship(from, to)
    }

}
