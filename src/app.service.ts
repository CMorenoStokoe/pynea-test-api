import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { driver, auth, EagerResult, RecordShape } from 'neo4j-driver';
import { Query } from './app';

/**
 * * Neo4J service
 * A service to access our Neo4j database which will be used across many endpoints in our api
 * @param query <Query> A cypher query
 * @return <Array[nodes | edges]> After a successful query, relevant results will be returned as an array
 * @exception Will throw an HTTPException if an error occurs 
 */

// todo: Unit testing with jest (controller/service.spec.ts)
// todo: There should be more error handling logic for failed requests, but a basic example is provided here
// todo: Validation required to protect against injection (@nest/class-validator)
// todo: Authentication required in production to ensure only authorised users can use this endpoint
// todo: Deconstruct Neo4j service after use to save resources and ensure reliability on the large scale
// todo: Add handling for response timeouts, so people with intermittent connections can re-try queries
// todo: Really we should explicitly create read/write transactions (using driver.session) but since this is a small app we aren't worried about load

// * extra: Documentation for reference/diagrams
// * extra: End to end testing
// * extra: Flexible Neo4jService to accommodate new queries/endpoints without a refactor

@Injectable()
export class Neo4jService {
	constructor(private configService: ConfigService) { }

	async query(query: Query) {

		const USER = this.configService.get<string>('NEO4J_USERNAME');
		const PASSWORD = this.configService.get<string>('NEO4J_PASSWORD');
		const URI = this.configService.get<string>('NEO4J_URI');

		try {
			const neo4j = driver(URI, auth.basic(USER, PASSWORD));
			const request = neo4j.executeQuery(query);
			const { records, summary }: EagerResult<RecordShape> = await request; // JSON payload (https://neo4j.com/docs/http-api/current/actions/result-format/)

			const success = summary.notifications.length === 0;

			if (success) {
				return records
			} else {
				throw new HttpException('Malformed query. Possible causes: invalid or badly formatted parameters supplied to endpoint (e.g., a value below 100 for sweetQuantity).', HttpStatus.BAD_REQUEST, {
					cause: JSON.stringify(summary.notifications),
				})
			}
		} catch (err) {
			throw new HttpException('Could not establish a connection to the database. Possible causes: invalid/no credentials supplied, network db unavailable/does not exist, or the api has not been configured correctly.', HttpStatus.INTERNAL_SERVER_ERROR, {
				cause: err,
			})
		}

	}
}
