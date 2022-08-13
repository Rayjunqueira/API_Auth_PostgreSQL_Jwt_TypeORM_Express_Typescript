import { DataSource } from "typeorm"
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.DATABASE_PORT as number | undefined

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: port,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
	entities: [`${__dirname}/../entities/*.{ts,js}`],
    migrations: [`${__dirname}/migrations/*.{ts,js}`],
})