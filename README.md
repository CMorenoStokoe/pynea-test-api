# Pynea

A technical test to develop a sweet management system ([Wiki](https://github.com/CMorenoStokoe/pynea-test-api/wiki))

## Description

This is a REST API written using Nestjs and Neo4j. It exposes various end point that meet the requirements of the technical challenge by providing functionalities to read and write from a network database storing details about sweets, machines and orders.
**Commenting:** I have tried to comment meaningfully while still writing code that is interpretable on its own. _You will find some comments pre-empting some limitations, particularly on the app.service.ts_

###Documentation
I have included some documentation including a **reference for the API** , as well as a **schematic diagram**.

- Reference for the API: Details entry points and expected parameters/return values for resources accessible from the API
- Schematic diagram: The schematic diagram represents where this API would sit within a wider architecture, for a high throughput social media system, where different design decisions would need to be made.
- Others: I am a visual planner and start every project with planning, so to represent this I've included two other diagrams that represent simpler aspects of routing (endpoint-mapping) and database structure (network-data)

## Pre-requisites

- Have GIT installed
- Have node and npm installed
- Have a command line interface available (e.g., Powershell)
- Access to a REST API testing CLI / application (e.g., insomnia)

## Get started

0. If not already done...

- Install GIT/GitHub (https://github.com/), node & npm (https://nodejs.org/en/download), as well as a REST API testing program like Insomnia (https://insomnia.rest/download)
- Open a command line interface (e.g., Powershell)
- Pull this repository to your local environment `git pull https://github.com/CMorenoStokoe/pynea-test-api`

1. Install dependencies `npm install`
2. Create a file called `.env` in the root of the folder and paste in credentials (pictures of setup sent securely via email)
3. Run API `nest start` (if this doesn't work run `npm i -g @nestjs/cli` first to ensure the nest CLI is installed)
4. Read the API-Reference documentation for end points to test using your testing program of choice (./documentation)

_Note: For the purposes of this test, I have not git-ignored the .env file, though usually creating this with your unique credentials would be an additional step._

## Tests

To run available tests run `npm run test:e2e`
_Note: Currently just some example end-to-end testing to show how we would test endpoints. As noted in the files, unit testing should make use of mock functions._
