import  express,{Request,Response} from "express";
import AppDataSource from "./database/db.config";
// const userRoute=require("./routes/userroute");
import userRoutes from "./routes/userRoute"
import { register } from "./controllers/user.controller";
import bodyParser from 'body-parser';
require('dotenv').config();

const app=express();
app.use(express.json())
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.use('/api/user', userRoutes);

// app.post('/register', register);



app.get('/',(req:Request,res:Response)=>{
res.send("Welcome to the express server")
})



AppDataSource.initialize().then(() => {
    console.log("Database has been initilazied");

    app.listen(PORT, () => {
        console.log(`Server has Started On Port ${PORT}`);
    })

}).catch(() => {
    console.log("Database Initilization Failed!!");
})