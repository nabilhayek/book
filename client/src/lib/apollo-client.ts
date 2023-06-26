import { useCurrentUser } from "@/hooks";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import Cookies from "js-cookie";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext((operation, { headers }) => {
  const currentUser = Cookies.get("currentUser");
  if (currentUser) {
    const { access_token: token, refresh_token: refreshToken } = JSON.parse(currentUser);

    if (operation.operationName === "Refresh") {
      return {
        headers: {
          ...headers,
          authorization: refreshToken ? `Bearer ${refreshToken}` : "",
        }
      };
    }

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    };
  }

  return {
    headers: {
      ...headers,
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
