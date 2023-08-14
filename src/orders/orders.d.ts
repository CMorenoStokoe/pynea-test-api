
/**
 * * Order properties
 * Keys and typings for properties of an order node
 */

export interface OrderProperties {
    orderId: number;
    customerName: string;
    status: 'Cancelled' | 'Delivered' | 'Processing' | 'Shipped';
}