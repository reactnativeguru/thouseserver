import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const user = "user";
const userPassword = "user";
const cluster = "cluster0-dor62.mongodb.net/test?retryWrites=true&w=majority";
const url = `mongodb+srv://${user}:${userPassword}@${cluster}`

export const connectDatabase = async (): Promise<Database> => {
    const client = await MongoClient.connect(
        url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        );
        // access database from 'main' cluster
        const db = client.db("main");

        //return an object with a listings key that references the test_listings collection in our database
        return {
            listings: db.collection("test_listings")
          };

  };