# API Reference Documentation

This file contains a short overview and list of accessible end points.
All end points currently return a response from a Neo4J database containing return values.
Both the API and this documentation were intended to be broadly in line with modern REST API specs
E.g.: https://spec.openapis.org/oas/latest.html

## sweets

Sweets are represented in the database as nodes with the following properties:

- name: string
- ingredients: string[]
- price: number
- quantityInStock: number

### get

`sweets/withQuantityBelow/:quantity`
Will return sweet nodes that are below a given quantity
@param quantity <number> Provided as a URL parameter
Example: http://localhost:3000/sweets/withQuantityBelow/500

### post

`sweets/`
Creates a new sweet node with given properties
@param Body <JSON> Expects properties to be provided as a JSON payload in the body of the request
Example: { "name":"Skittles", "ingredients":["sugar", "sweetener", "coloring", "preservative"], "price":0.05, "quantityInStock":5000 }

## orders

Orders are represented in the database as nodes with the following properties:

- orderId: number
- customerName: string
- status: 'Cancelled' | 'Delivered' | 'Processing' | 'Shipped'

Orders can have relationships indicating they contain sweets, and these are represented as edges in the database with the label CONTAINS.

### get

`orders/withStatus/:status`
Returns all orders with a given status ('pending' | 'delivered')
@param status <string> Provided as a URL parameter
Example: http://localhost:3000/orders/withStatus/Shipped

`orders/containing/:sweet`
Get orders by contents
Returns all orders containing a given sweet
@param sweet <string> Name of a sweet the order contains, provided as a URL parameter
Example: http://localhost:3000/orders/containing/Gummy Bears

`orders/:orderId/nowContains/:sweet`
Creates a new relationship between an order and a sweet it contains
@param orderId <number> Source order which contains the sweet
@param sweet <string> Name of the sweet contained within the order
Example: http://localhost:3000/orders/1005/nowContains/Gummy Bears

### post

`orders/`
Creates a new order node with given properties
@param Body <JSON> Expects properties to be provided as a JSON payload in the body of the request
Example: { "orderId":999, "customerName":"Chris MS", "status":"Pending" }

## machines

Machines are represented in the database as nodes with the following properties:

- machineId: string
- type: string
- capacity: string
- status: 'unavailable' | 'available'

Machines can have relationships indicating they produce sweets, and these are represented as edges in the database with the label PRODUCES.

### get

`machines/producing/:sweet`
Returns all machines producing containing a given sweet
@param sweet <string> Name of a sweet the machine produces, provided as a URL parameter
Example: http://localhost:3000/machines/producing/Gummy Bears

`machines/:machine/nowProduces/:sweet`
Creates a new relationship between machine and a sweet it produces
@param machine <number> Id of the machine that produces the sweet
@param sweet <string> Name of the sweet produced by the machine
Example: http://localhost:3000/machines/M009/nowProduces/Gummy Bears

### post

`machines/`
Creates a new machine node with given properties
@param Body <JSON> Expects properties to be provided as a JSON payload in the body of the request
Example: { "machineId":"M101", "type":"Liquorice Stomper", "capacity":"35kg", "status":"available" }
