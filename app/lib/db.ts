import mongoose from "mongoose";

const mongo_uri=process.env.MONGODB_URI as string;
if(!mongo_uri){
    throw new Error('MONGODB_URI is not defined');
}

declare global{
    var mongoooseSchema:{
        connect:typeof mongoose | null;
        promise:Promise<typeof mongoose> | null;
    }
}
let cache=global.mongoooseSchema;
if(!cache){
    cache=global.mongoooseSchema={
        connect: null,
        promise: null
    }
}
export async function connectToDatabase(){
    if(cache.connect){
        return cache.connect;
    };
    if(!cache.promise){
        cache.promise=mongoose.connect(mongo_uri).then(mongoose=>mongoose);
    }
    try{
        cache.connect=await cache.promise;
        return cache.connect;
    }catch(e){
        cache.promise=null;
        throw e;
    }
}

