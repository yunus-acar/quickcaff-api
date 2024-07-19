import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres', // Veritabanı tipi
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*{.js,.ts}'],
  synchronize: true, // Veritabanı ile senkronizasyon
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => console.log(error));
