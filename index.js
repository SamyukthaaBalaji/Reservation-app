import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelRoute from "./routes/hotel.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/users.js"
import roomRoute from "./routes/room.js"

const app = express();
dotenv.config();  
const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://samyukthaa2003:samyuk123@cluster0.xguncj3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
  } catch (err) {
    console.log(err)
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongoD disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("mongoD connected");
});

//middleware
app.use(cookieParser())
app.use(express.json())


app.use("/api",authRoute);
app.use("/api/", userRoute);
app.use("/api", hotelRoute);
app.use("/api/", roomRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  });
});



const PORT = 8000;
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
