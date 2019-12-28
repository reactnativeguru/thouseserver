require("dotenv").config();


import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import { connectDatabase } from "./database";

// const port = 9000;

const mount = async (app: Application) => {
  const db = await connectDatabase();
    // Apollo Server constructor gets called with every request so we're able to set the context based off request details if we're interested but in our case, we'll simply just pass in the db object.
  const server = new ApolloServer({ 
      typeDefs, 
      resolvers,
      context: () => ({ db })
     });

  server.applyMiddleware({ app, path: "/api" });
  app.listen(process.env.PORT);

  console.log(`[app] : http://localhost:${process.env.PORT}`);
  const listings = await db.listings.find({}).toArray();
  console.log(listings);
};
// To be able to run the connectDatabase() function the minute our server starts, we'll slightly configure how our src/index.ts file is shaped. To make things a little more apparent, we'll create a mount() function that accepts the Express app instance. We'll dictate that this mount() function will be the parent function to run to essentially start our Node Express server.

mount(express());

console.log(`[app] : http://localhost:${process.env.PORT}`);