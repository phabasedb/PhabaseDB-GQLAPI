/** 
# dataServicesServer.js

## Description
Configures Graphql server

## Usage
```shell
npm start
```

## Arguments/Parameters
N/A

## Examples
N/A

## Return 
N/A

## Category
RegulonDB Coexpression web service

## License

## Author 


**/

// imports needed libraries
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import rateLimit from "express-rate-limit";
import { typeDefs } from "./services/common/generalSchema";
import { resolvers } from "./services/common/generalResolver";
const { buildSubgraphSchema } = require("@apollo/subgraph");
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
const conectarDB = require("./config/dbConnection");
require("dotenv").config();

//Make the connection to mongoDB
conectarDB();

const configApolloServer = async () => {
  const federatedSchema = buildSubgraphSchema([
    {
      typeDefs: typeDefs,
      resolvers: resolvers,
    },
  ]);

  //Defining graphql server
  const serverDataServices = new ApolloServer({
    schema: federatedSchema,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    introspection: true,
    formatError: (err) => ({
      message: err.message,
      status: err.extensions.exception.status,
      statusCode: err.extensions.exception.statusCode,
    }),
  });

  // create an instance of express to be used with ApolloServer
  const app = express();

  //Set a variable to limit requests
  const limiter = rateLimit({
    windowMs: 60000,
    max: 1000,
    message: {
      message: "Too many requests",
      statusCode: 429,
    },
  });

  //Assign limit to the API
  app.use(limiter);

  //adding an await to start the closedToolsServer
  await serverDataServices.start();

  // apply express instance to apolloserver
  serverDataServices.applyMiddleware({
    app,
    cors: {
      origin: "*",
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    },
  });

  //Set an enviroment variable for the port (4000 by default)
  const PORT = process.env.JAMAPA_GRAPHQL_PORT || 4000;

  //Server start
  const servExpress = app.listen(PORT);
  console.log(
    `El servidor esta funcionando en http://localhost:${
      servExpress.address().port
    }${serverDataServices.graphqlPath}`
  );
};

configApolloServer();
