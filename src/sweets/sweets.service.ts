import { Injectable } from '@nestjs/common';
import { Neo4jService } from '../app.service';
import { SweetProperties } from './sweets';

@Injectable()
export class SweetsService {
    constructor(private readonly db: Neo4jService) { }

    // ! Returns an error when there are no matches instead of a blank array
    // todo: Use parameters instead of injecting values directly into strings ($quantity)

    getSweetsBelowQuantity(quantity: number) {
        return this.db.query(`
        MATCH (n:sweet)
        WHERE n.quantityInStock<${quantity} 
        RETURN n`);
    }

    getSweetsProducedByMachine(machineId: string) {
        return this.db.query(`
        MATCH (n1:sweet)<-[e]-(n2:machine)
        WHERE n2.machineId=${machineId} 
        RETURN n1`);
    }

    // todo: There is probably a more terse way to deconstruct and array these properties

    addSweet({ name, ingredients, price, quantityInStock }: SweetProperties) {
        const properties = `{ name:"${name}", ingredients:[${ingredients.map(x => `"${x}"`)}], price:${price}, quantityInStock:${quantityInStock} }`;
        return this.db.query(`
        CREATE (n:sweet ${properties} )
        RETURN n`);
    }
}

