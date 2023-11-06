import mongoose from "mongoose";

export default async function connect()
{


try {

await mongoose.connect("mongodb+srv://patekarkartik:KPMONGO@mongo.xwwzj6m.mongodb.net/EDCOM?retryWrites=true&w=majority")
console.log("CONNECTED !")


    
} catch (error) {
    console.log(error);
}








}