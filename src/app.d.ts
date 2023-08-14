/**
 * * App typings
 * Typing used by the app service for Neo4J
 */

// todo: This is a copy of a private type in neo4j-driver-core/types/types and there is probably a reason it's not public

export type Query = string | String | {
    text: string;
    parameters?: any;
};