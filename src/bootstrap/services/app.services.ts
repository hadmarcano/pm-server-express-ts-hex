import { DB_CONFIG } from '../interfaces/dbConfig.interface'

export class AppService {
   static get PORT(): number {
      return +process.env.PORT || 3000
      // return Number(process.env.PORT) || 3000
   }

   static get DBConfig(): DB_CONFIG {
      return {
         host: process.env.DB_HOST || 'localhost',
         port: +process.env.DB_PORT || 3310,
         entities: [process.env.DB_ENTITIES || 'src/**/*.entity{.ts,.js}'],
         username: process.env.DB_USER || 'user',
         password: process.env.DB_PASS || '1234',
         database: process.env.DB_NAME || 'mysqlhexa',
         syncronize: process.env.DB_SYNC === 'true' ? true : false,
         logging: process.env.DB_LOGG === 'true' ? true : false,
      }
   }
}

// For DEV:
// 1 - use this line
//  entities: [process.env.DB_ENTITIES || 'src/**/*.entity{.ts,.js}'],
// 2 - npm run dev

// For PROD:
// 1 - use this line
// entities: [process.env.DB_ENTITIES || 'dist/**/*.entity.js'],
// 2 - npm run build
// 3 - npm run prod

// For create DOCKER IMAGE:
// 1 - run this comand from comand line:
// docker build -t app-node-express:1.0.0 .
