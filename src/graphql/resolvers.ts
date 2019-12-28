import { IResolvers } from "apollo-server-express";
// import { listings } from "../listings";
import { Database, Listing } from "../lib/types";
import { ObjectId } from "mongodb";

export const resolvers: IResolvers = {
  Query: {
    // paci
    listings: async(
      _root: undefined,
      _args: {}, 
      {db}: {db: Database}
      ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    }
  },
  Mutation: {
    deleteListing: async (
      _root: undefined, 
      { id }: { id: string },
      {db}: {db: Database}
      ): Promise<Listing> => { // async so type is Promise of return type Listing
   const deleteRes = await db.listings.findOneAndDelete({
     _id: new ObjectId(id) // converted sting id to hexadecimal equivalent with new ObjectId() function
    })
    if(!deleteRes.value) {
      throw new Error(' failed to delete listing')
    }
    return deleteRes.value;
  }
  },
  Listing :{
    // example of trivial resolver, apollo framework takes care of mapping of field level data resolvers
    //title: (listing: Listing) => listing.title
    //image: (listing: Listing) => listing.image
    id : (listing: Listing): string => listing._id.toString()
  }
};