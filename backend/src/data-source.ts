import "reflect-metadata";
import { DataSource } from "typeorm";
import { Visiteur } from "./entities/Visiteur";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
<<<<<<< HEAD
    password: "root", 
=======
    password: "0000",
>>>>>>> 10c4e87 (test)
    database: "visitor_db",
    synchronize: true, // Auto-création des tables (très utile en dev)
    logging: false,
    entities: [Visiteur],
    migrations: [],
    subscribers: [],
});