# RegulonDB-WS GraphQL API

## Description

This software includes all the necessary tools to extract data from PhabaseDB Datamarts Collections. Currently, the collections that can be extracted are listed below:

- Data
  - Gene

## Motivation

With the development of PhabaseDB, transitioning from a relational model to a document-based model that contains all the data of the collection now called datamart, this application allows you to retrieve data from the multigenomic system and build datamarts for GraphQL API query services.

## System requirements

Required software

- Node JS ^16.13.0
- NPM ^8.1.4

## Install

Once the repo is cloned, use this command to install all libraries dependencies of the API

```bash
$ npm install
```

After that, use the following command and edit the ".env-sample" file to add credentials to access the MongoDB collections (keeping the variable name) and the ports for GraphQL servers (by default is used port 4001 for the gateway, 4002 for private services, and 4003 for public services).

```bash
# On Unix
nano .env-sample

# On Windows
notepad .\.env-sample
```

Then use the next command for rename the file to ".env"

```bash
# On Unix
mv .env-sample .env

# On Windows
REN .env-sample .env
```

## Quick start

Just use this command to start RegulonDB GraphQL Closed, Open and Gateway Services:

```
$ npm start
```

Now if the GraphQL Closed or Open ports in .env was not defined, it will take port 4001, 4002 and 4003 (by default) and GraphQL Playgroud for closedServices will run at http://localhost:4002/graphql, for OpenServices will run at http://localhost:4003/graphql and for Gateway will run at http://localhost:4001/graphql

---
