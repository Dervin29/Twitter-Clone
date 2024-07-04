import {graphql} from "graphql";

export const verifyGoogleToken = graphql(`
    #graphql
    query VerifyGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
    }
`); 