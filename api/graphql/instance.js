/* eslint-disable */
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, from } from "apollo-link";
import { onError } from "apollo-link-error";
import { InMemoryCache } from "apollo-cache-inmemory";
import apiConfig from "~/config/endpoint";

const instance = {
    client: null,
    store: null
};

export const createInstance = ({ store, route, redirect }) => {
    instance.store = store;
    const httpLink = new HttpLink({
        uri: apiConfig.ENDPOINT_URL
    });

    const authMiddleware = new ApolloLink((operation, forward) => {
        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                Authorization: `Bearer ${
                    store.state.auth.auth
                        ? store.state.auth.auth.accessToken
                        : ""
                }`
            }
        }));
        return forward(operation);
    });

    const responseLink = new ApolloLink((operation, forward) => {
        return forward(operation).map(response => {
            // Afterware while response work
            return response;
        });
    });

    const errorLink = onError(error => {
        // if (error) {
        //     store.commit("auth/resetAuth");
        //     redirect("/");
        // }
        // error
    });

    const client = new ApolloClient({
        link: from([authMiddleware, errorLink, responseLink, httpLink]),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: "network-only",
                errorPolicy: "ignore"
            },
            query: {
                fetchPolicy: "network-only",
                errorPolicy: "all"
            }
        }
    });

    instance.client = client;
};

export default instance;
