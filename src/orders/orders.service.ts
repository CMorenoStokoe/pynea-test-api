import { Injectable } from '@nestjs/common';
import { OrderProperties } from './orders';
import { Neo4jService } from '../app.service';
import { SweetProperties } from '../sweets/sweets';
import { OrderEdgeDto } from './orders.dto';

@Injectable()
export class OrdersService {
    constructor(private readonly db: Neo4jService) { }

    getOrdersWithStatus(status: OrderProperties['status']) {
        return this.db.query(`
        MATCH (n:order)
        WHERE n.status="${status}"
        RETURN n`);
    }

    getOrdersContainingSweet(sweet: SweetProperties['name']) {
        return this.db.query(`
        MATCH (:sweet {name:"${sweet}"})<-[:CONTAINS]-(n:order) 
        RETURN n`);
    }

    addOrder({ orderId, customerName, status }: OrderProperties) {
        const properties = `{ orderId:${orderId}, customerName:"${customerName}", status:"${status}" }`;
        return this.db.query(`
        CREATE (n:order ${properties} )
        RETURN n`);
    }

    addRelationship(from: OrderEdgeDto['from'], to: OrderEdgeDto['to']) {
        return this.db.query(`
        MATCH (n0:order), (n1:sweet)
        WHERE n0.orderId=${from} AND n1.name = "${to}"
        CREATE (n0)-[:CONTAINS]->(n1);`);
    }

}
