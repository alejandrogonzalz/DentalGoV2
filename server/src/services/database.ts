import mongoose, {ConnectOptions} from "mongoose";

// const URL = process.env.DATABASE_URI
const connectDB = async () =>{
    try { 
        await mongoose.connect(`${process.env.DATABASE_URI}`,{
            useNewUrlParser: true,
        } as ConnectOptions)
    } catch (err) {
        console.error(err)
    }
}

export default connectDB