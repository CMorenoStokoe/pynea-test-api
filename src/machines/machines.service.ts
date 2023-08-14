import { Injectable } from '@nestjs/common';
import { MachineProperties } from './machines';
import { Neo4jService } from '../app.service';
import { SweetProperties } from '../sweets/sweets';
import { MachineEdgeDto } from './machines.dto';

@Injectable()
export class MachinesService {
    constructor(private readonly db: Neo4jService) { }

    getMachinesProducingSweet(sweet: SweetProperties['name']) {
        return this.db.query(`
        MATCH (:sweet {name:"${sweet}"})<-[:PRODUCES]-(n:machine) 
        RETURN n`);
    }

    addMachine({ machineId, capacity, type, status }: MachineProperties) {
        const properties = `{ machineId:"${machineId}", capacity:"${capacity}", type:"${type}", status:"${status}" }`;
        return this.db.query(`
        CREATE (n:machine ${properties} )
        RETURN n`);
    }

    addRelationship(from: MachineEdgeDto['from'], to: MachineEdgeDto['to']) {
        return this.db.query(`
        MATCH (n0:machine), (n1:sweet)
        WHERE n0.machineId="${from}" AND n1.name = "${to}"
        CREATE (n0)-[:PRODUCES]->(n1);`);
    }

}
