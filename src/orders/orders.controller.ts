import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { OrderDto, OrderEdgeDto } from './orders.dto';
import { OrdersService } from './orders.service';
import { OrderProperties } from './orders';
import { SweetProperties } from '../sweets/sweets';

@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService) { }

    /**
     * * Get orders by status
     * Returns all orders with a given status ('pending' | 'delivered')
     * @param status <string> Provided as a URL parameter
     */

    @Get('withStatus/:status')
    findNodesByStatus(
        @Param('status') status: OrderProperties['status']
    ) {
        return this.ordersService.getOrdersWithStatus(status);
    }

    /**
   * * Get orders by contents
   * Returns all orders containing a given sweet
   * @param sweet <string> Name of a sweet the order contains, provided as a URL parameter
   */

    @Get('containing/:sweet')
    findNodesByRelationship(
        @Param('sweet') sweet: SweetProperties['name']
    ) {
        return this.ordersService.getOrdersContainingSweet(sweet);
    }

    /**
     * * New order
     * Creates a new order node with given properties
     * @param Body <JSON> Expects properties to be provided as a JSON payload in the body of the request
     */

    @Post()
    insertNewNode(
        @Body() { orderId, customerName, status }: OrderDto
    ) {
        return this.ordersService.addOrder({ orderId, customerName, status })
    }

    /**
     * * New relationship
     * Creates a new relationship between an order and a sweet it contains
     * @param orderId <number> Source order which contains the sweet
     * @param sweet <string> Name of the sweet contained within the order
     */

    @Get(':orderId/nowContains/:sweet')
    insertNewEdge(
        @Param('orderId') from: OrderEdgeDto['from'],
        @Param('sweet') to: OrderEdgeDto['to']
    ) {
        return this.ordersService.addRelationship(from, to)
    }

}
