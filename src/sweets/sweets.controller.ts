import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { SweetDto } from './sweets.dto';
import { SweetsService } from './sweets.service';

@Controller('sweets')
export class SweetsController {
    constructor(private readonly sweetsService: SweetsService) { }

    /**
     * * Get sweets below quantity
     * Will return sweet nodes that are below a given quantity
     * @param quantity <number> Provided as a URL parameter
     */

    @Get('withQuantityBelow/:quantity')
    findNodesByQuantity(
        @Param('quantity') quantity: number
    ) {
        return this.sweetsService.getSweetsBelowQuantity(quantity);
    }

    /**
     * * New sweet
     * Creates a new sweet node with given properties
     * @param Body <JSON> Expects properties to be provided as a JSON payload in the body of the request
     */

    @Post()
    insertNewNode(
        @Body() { name, ingredients, price, quantityInStock }: SweetDto
    ) {
        return this.sweetsService.addSweet({ name, ingredients, price, quantityInStock })
    }
}
