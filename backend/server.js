const app = require("./app")

//config
const dotenv=require("dotenv")
const connectDatabase = require("./config/database")
process.on("uncaughtException",(err)=>{
    console.log(`"Error: ${err.message}`)
    console.log("shutting down the server due to uncaught Exception")
    process.exit(1)
})
dotenv.config({path:"backend/config/config.env"})
//connecting database
connectDatabase()
const Server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})
//unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server due to unhandlled Promise Rejection")

    Server.close(()=>
    process.exit(1))
}
)