import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'
import Quiz from './pages/Quiz'
import Signup from './pages/Signup'

//import Apollo hooks and modules
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client"

import { setContext } from "@apollo/client/link/context"

// Construct main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// execute the `authLink` middleware prior to making the request to our GraphQL API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

