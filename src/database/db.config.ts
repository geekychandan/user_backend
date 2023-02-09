import { DataSource } from "typeorm";
import path from "path";
import { User } from "../entities/user.entity";

const AppDataSource=new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "pratik@123",
    database: "users_db",
    synchronize: true,
    logging: true,
    entities: [User],
})

export default AppDataSource;


