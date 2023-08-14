import { SweetProperties } from "../sweets/sweets";
import { OrderProperties } from "./orders";

/**
 * * Orders data transfer objects
 * Define the structure of data we expect from JSON payloads
 */

export class OrderDto {
    readonly orderId: OrderProperties['orderId'];
    readonly customerName: OrderProperties['customerName'];
    readonly status: OrderProperties['status'];
};

export class OrderEdgeDto {
    readonly from: OrderProperties['orderId'];
    readonly to: SweetProperties['name'];
    readonly type: 'CONTAINS';
};