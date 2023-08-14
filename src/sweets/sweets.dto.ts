import { SweetProperties } from "./sweets";

/**
 * * Sweets data transfer object
 * Define the structure of data we expect from a JSON payload
 */

export class SweetDto {
    readonly name: SweetProperties['name'];
    readonly ingredients: SweetProperties['ingredients'];
    readonly price: SweetProperties['price'];
    readonly quantityInStock: SweetProperties['quantityInStock'];
};