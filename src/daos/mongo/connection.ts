import mongoose, { ConnectOptions } from "mongoose";

export const connectionString =
    "mongodb+srv://coderHouse:thisIsCoderHouse123@cluster0.hgreuhe.mongodb.net/?retryWrites=true&w=majority";

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    try {
        await mongoose.connect(connectionString, {
            dbName: "coderHouseProject",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.log("MongoDB is connected");
    } catch (error: any) {
        console.log("Failed to connect to database", { message: error.message });
    }
};
