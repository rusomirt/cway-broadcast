import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';

// Constants
import { endpoints } from '@cway/cway-frontend-common/constants';
import possibleTypes from '@cway/cway-frontend-common/graphql/PossibleTypesEnums';

const cache = new InMemoryCache({ possibleTypes });

// Default HTTP link is replaced with createUploadLink which allows to upload files
const httpLink = createUploadLink({ uri: endpoints.graphql });

// Add NextGen app identification to every request "X-Calling-App" header (to distinguish from old Cway app)
const idHeaderLink = new ApolloLink((operation, forward) => {
  // console.log('%cidHeaderLink operation: ', 'color: blue', operation);
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      'X-Calling-App': process.env.REACT_APP_CWAY_APPLICATION,
    },
  }));
  return forward(operation);
});

// Handle GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  console.log('%cerrorLink operation: ', 'color: blue', operation);
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`, 'color: orange');
    });
  }

  if (networkError) {
    console.log(`%c [Network error]: ${networkError}`, 'color: orange');
  }
});

// Initialize Apollo client
const client = new ApolloClient({
  link: ApolloLink.from([errorLink, idHeaderLink, httpLink]),
  cache,
});

export default client;
